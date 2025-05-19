import os
from typing import List

from langchain_core.documents import Document

from main.chunk import save_index_cards_as_csv, load_docs, jump_through_lists
from main.ai import graph


docs: List[Document] = load_docs("./data/Vorlesungsunterlagen/")
user_instructions = """Es gibt keine speziellen Anweisungen vom Nutzer."""

print("Loaded documents:",len(docs))
for doc in docs:
    print("Page Count:", len(doc))
    file_path = doc[0].metadata["file_path"]
    file_name = os.path.basename(file_path)
    file_name_as_csv = os.path.splitext(file_name)[0] + ".csv"

    # Verwende die ausgelagerte Funktion mit einem Jump von 5
    first_pages, target_pages, last_pages = jump_through_lists(
        [], [], doc, jump=5
    )

    initial_state = {
        "last_pages": last_pages,
        "target_pages": target_pages,
        "first_pages": first_pages,
        "user_instructions": user_instructions,
    }

    # Run the graph with the initial state
    results = graph.invoke(initial_state, {"recursion_limit": 100})["all_index_cards"]

    # 2. Die bereinigte, flache Liste in eine CSV speichern
    save_index_cards_as_csv(results, file_name_as_csv, "./data/Karteikarten/")

    print("Results:", results)


