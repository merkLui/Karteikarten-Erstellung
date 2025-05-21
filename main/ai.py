import os
from typing import List, TypedDict

from langchain_core.documents import Document
from langgraph.graph import StateGraph, END, START
import pydantic

from .prompt import GraphState, sys_prompt_index_card_generator, sys_prompt_supervisor, IndexCard
from .llm import model
from .chunk import save_index_cards_as_csv, load_docs, jump_through_lists

def index_card_builder(state: GraphState):
    """
    Create a StateGraph object with the State class.
    Process pages based on jump size at once as target_pages.
    """
    # Extract current state
    first_pages = state.get("first_pages", [])
    target_pages = state.get("target_pages", [])
    last_pages = state.get("last_pages", [])
    user_instructions = state.get("user_instructions", "")

    # Limit first_pages and last_pages to 100 elements if they exceed that length
    limited_first_pages = first_pages[-5:] if isinstance(first_pages, list) and len(first_pages) > 5 else first_pages
    limited_last_pages = last_pages[:10] if isinstance(last_pages, list) and len(last_pages) > 10 else last_pages

    #print("Debug Supervisor Instructions index_card_builder:", supervisor_instructions)

    prompt = sys_prompt_index_card_generator.format(
        first_pages=limited_first_pages,
        target_pages=target_pages,
        last_pages=limited_last_pages,
        user_instructions=user_instructions,
    )
    class Output(TypedDict):
        index_cards: List[IndexCard] = pydantic.Field(description="Die Karteikarten, welche du generierst.")

    index_cards: List = model.with_structured_output(Output).invoke(prompt)["index_cards"]
    
    staged_index_cards = index_cards

    return {
        "staged_index_cards": staged_index_cards,
        "target_pages": target_pages,
        "first_pages": first_pages,
        "last_pages": last_pages,
    }

def index_card_supervisor(state: GraphState):
    # Extract current state
    target_pages = state.get("target_pages", [])
    first_pages = state.get("first_pages", [])
    last_pages = state.get("last_pages", [])
    all_index_cards = state.get("all_index_cards", [])
    staged_index_cards = state.get("staged_index_cards", [])
    user_instructions = state.get("user_instructions", "")

    prompt = sys_prompt_supervisor.format(
        index_cards=staged_index_cards,
        target_pages=target_pages,
        user_instructions=user_instructions,
        all_index_cards=all_index_cards,
    )
    class Output(TypedDict):
        approved_index_cards: List[IndexCard] = pydantic.Field(description="Alle Karteikarten, welche in den Karteikartensatz übernommen werden sollen.")
    
    approved_index_cards = model.with_structured_output(Output).invoke(prompt)["approved_index_cards"]

    for approved_index_card in approved_index_cards:
        all_index_cards.append(approved_index_card)

    return {
        "all_index_cards": all_index_cards,
        "target_pages": target_pages,
        "first_pages": first_pages,
        "last_pages": last_pages,
        "staged_index_cards": [],
    }



def conditional_edge(state: GraphState):
    """
    Define a conditional edge that checks if there are still pages to process.
    """
    # Check if there are still pages to process in target_pages
    if state["target_pages"] and len(state["target_pages"]) > 0:
        return "index_card_builder"
    else:
        return END
    

builder = StateGraph(GraphState)
builder.add_node("index_card_builder", index_card_builder)
builder.add_node("index_card_supervisor", index_card_supervisor)

builder.add_edge(START, "index_card_builder")
builder.add_edge("index_card_builder", "index_card_supervisor")
builder.add_edge("index_card_supervisor", END)


graph = builder.compile()


