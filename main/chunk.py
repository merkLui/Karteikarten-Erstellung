import os
import csv

from typing import List

from langchain_core.documents import Document


from langchain_community.document_loaders.parsers import LLMImageBlobParser
from langchain_pymupdf4llm import PyMuPDF4LLMLoader

from .llm import model_for_images

def chunk_file(file_path):

    file_path = file_path
    loader = PyMuPDF4LLMLoader(
        file_path,
        mode="page",
        extract_images=True,
        images_parser=LLMImageBlobParser(
            model=model_for_images),
            )

    return loader.load()

def load_docs(path: str) -> List[Document]:
    documents: List[Document] = []
    for root, _, files in os.walk(path):
        for fname in files:
            # Nur echte PDF-Dateien lesen, versteckte Dateien überspringen
            if fname.startswith(".") or not fname.lower().endswith(".pdf"):
                continue
            full_path = os.path.join(root, fname)
            documents.append(chunk_file(full_path))
    return documents

def jump_through_lists(first_list: list, middle_list: list, last_list: list, jump: int):
    """
    Verschiebt Elemente zwischen drei Listen in einer Sequenz:
    1. Fügt mittlere Liste zur ersten Liste hinzu
    2. Nimmt die nächsten 'jump' Elemente aus der letzten Liste und macht sie zur mittleren Liste
    
    Args:
        first_list: Die Liste, die Elemente aus der mittleren Liste aufnimmt
        middle_list: Die Liste, die zwischen erster und letzter Liste wandert
        last_list: Die Liste, aus der neue Elemente genommen werden
        jump: Anzahl der Elemente, die von last_list zu middle_list verschoben werden
        
    Returns:
        tuple: (first_list, middle_list, last_list) - die aktualisierten Listen
    """
    # Verschiebe middle_list zu first_list
    if middle_list:
        if isinstance(first_list, list):
            first_list = first_list + middle_list
        else:
            first_list = middle_list
    
    # Nimm die nächsten 'jump' Elemente aus last_list als neue middle_list
    if last_list and len(last_list) > 0:
        elements_to_take = min(jump, len(last_list))
        middle_list = last_list[:elements_to_take]
        last_list = last_list[elements_to_take:]
    else:
        middle_list = []
    
    return first_list, middle_list, last_list


def deduplicate_flat_flashcards(flat_flashcard_data):
    """
    Entfernt exakte Duplikate aus einer flachen Liste von Karteikarten-Dicts.
    """
    unique_cards_list = []
    seen_cards_tuples = set()
    required_keys = ['question', 'answer', 'source']

    # Direkte Iteration über die flache Liste
    for card in flat_flashcard_data:
        # Prüfe, ob 'card' ein Dictionary ist und die benötigten Schlüssel hat
        if isinstance(card, dict) and all(key in card for key in required_keys):
            card_tuple = (card['question'], card['answer'], card['source'])
            # Füge die Karte hinzu, wenn das Tupel noch nicht gesehen wurde
            if card_tuple not in seen_cards_tuples:
                unique_cards_list.append(card)
                seen_cards_tuples.add(card_tuple)
    return unique_cards_list

def save_index_cards_as_csv(results, csv_filename, path_to_directory):
    """
    Speichert eine flache Liste von Karteikarten-Dicts als CSV
    (Spalten: Frage | Antwort, wobei die Quelle an die Antwort angehängt wird).
    """
    # Nur noch zwei CSV-Spalten
    headers = ['Frage', 'Antwort']
    row_count = 0

    flat_flashcard_list = deduplicate_flat_flashcards(results)

    full_path = os.path.join(path_to_directory, csv_filename)

    try:
        os.makedirs(path_to_directory, exist_ok=True)

        with open(full_path, 'w', newline='', encoding='utf-8') as csvfile:
            writer = csv.writer(csvfile)
            # Optional: Header schreiben – auskommentieren, falls nicht gewünscht
            # writer.writerow(headers)

            for card in flat_flashcard_list:
                if not isinstance(card, dict):
                    continue

                question_text = card.get('question', '').strip()
                answer_text   = card.get('answer',   '').rstrip()
                source_text   = card.get('source',   '').strip()

                # Quelle elegant anhängen (falls vorhanden)
                if source_text:
                    # Satzende prüfen – falls die Antwort nicht auf . ! ? endet, einen Punkt setzen
                    if answer_text and answer_text[-1] not in '.!?':
                        answer_text += '.'
                    # Zwei Zeilen Abstand für bessere Lesbarkeit
                    answer_text += f"\n\nQuelle: {source_text}"

                writer.writerow([question_text, answer_text])
                row_count += 1

        print(f"\n{row_count} Karteikarten erfolgreich in '{full_path}' gespeichert.")
        return True

    except Exception as e:
        print(f"\nFehler beim Speichern der CSV: {e}")
        return False