"""Modul zur Steuerung des KI-Graphen für die Erstellung von Frage-Antwort-Karteikarten."""

from typing import List, TypedDict

from langgraph.graph import StateGraph, END, START
import pydantic

from .prompt import GraphState, sys_prompt_index_card_generator, sys_prompt_supervisor, IndexCard, examples
from .llm import model

def index_card_builder(state: GraphState):
    """Erstellt Karteikarten aus den Zielseiten und bereitet sie für die Supervisor-Prüfung vor."""
    # Aktuellen Zustand extrahieren
    first_pages = state.get("first_pages", [])
    target_pages = state.get("target_pages", [])
    last_pages = state.get("last_pages", [])
    user_instructions = state.get("user_instructions", "")

    # first_pages und last_pages auf 100 Elemente begrenzen, falls sie diese Länge überschreiten
    limited_first_pages = first_pages[-5:] if isinstance(first_pages, list) and len(first_pages) > 5 else first_pages
    limited_last_pages = last_pages[:10] if isinstance(last_pages, list) and len(last_pages) > 10 else last_pages

    # Prompt generieren
    prompt = sys_prompt_index_card_generator.format(
        first_pages=limited_first_pages,
        target_pages=target_pages,
        last_pages=limited_last_pages,
        user_instructions=user_instructions,
        examples=examples,
    )

    # Klasse für die strukturierte Ausgabe des LLM´s definieren
    class Output(TypedDict):
        index_cards: List[IndexCard] = pydantic.Field(description="Die Karteikarten, welche du generierst.")

    # LLM aufrufen und Karteikarten generieren
    index_cards: List = model.with_structured_output(Output).invoke(prompt)["index_cards"]
    
    staged_index_cards = index_cards

    # Die State des Graphen aktualisieren
    return {
        "staged_index_cards": staged_index_cards,
        "target_pages": target_pages,
        "first_pages": first_pages,
        "last_pages": last_pages,
    }

def index_card_supervisor(state: GraphState):
    """Überprüft generierte Karteikarten und fügt genehmigte Karten dem Gesamtset hinzu."""
    # Aktuellen Zustand extrahieren
    target_pages = state.get("target_pages", [])
    first_pages = state.get("first_pages", [])
    last_pages = state.get("last_pages", [])
    all_index_cards = state.get("all_index_cards", [])
    staged_index_cards = state.get("staged_index_cards", [])
    user_instructions = state.get("user_instructions", "")

    # Prompt generieren
    prompt = sys_prompt_supervisor.format(
        index_cards=staged_index_cards,
        target_pages=target_pages,
        user_instructions=user_instructions,
        all_index_cards=all_index_cards,
        examples=examples,
    )

    # Klasse für die strukturierte Ausgabe des LLM´s definieren
    class Output(TypedDict):
        approved_index_cards: List[IndexCard] = pydantic.Field(description="Alle Karteikarten, welche in den Karteikartensatz übernommen werden sollen.")
    
    # LLM aufrufen und genehmigte Karteikarten generieren
    approved_index_cards = model.with_structured_output(Output).invoke(prompt)["approved_index_cards"]

    # Genehmigte Karteikarten zum Gesamtset hinzufügen
    for approved_index_card in approved_index_cards:
        all_index_cards.append(approved_index_card)

    # State des Graphen aktualisieren
    return {
        "all_index_cards": all_index_cards,
        "target_pages": target_pages,
        "first_pages": first_pages,
        "last_pages": last_pages,
        "staged_index_cards": [],
    }    

builder = StateGraph(GraphState) # Initialisierung des Graphen mit der richtigen Klasse als State
builder.add_node("index_card_builder", index_card_builder) # Funktion zum Erstellen der Karteikarten zum Graphen hinzufügen
builder.add_node("index_card_supervisor", index_card_supervisor) # Funktion zum Überprüfen der Karteikarten zum Graphen hinzufügen

builder.add_edge(START, "index_card_builder") # Graph startet mit dem index_card_builder
builder.add_edge("index_card_builder", "index_card_supervisor") # Weiterleitung zur Überprüfung der Karteikarten
builder.add_edge("index_card_supervisor", END) # Ende des Graphen nach der Überprüfung

graph = builder.compile() # Kompilieren des Graphen für die Verwendung