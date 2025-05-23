"""Modul zum Zerlegen von PDF-Dokumenten in Seiten und Speichern als CSV."""

import os
import csv
from typing import List

from langchain_core.documents import Document


from langchain_community.document_loaders.parsers import LLMImageBlobParser
from langchain_pymupdf4llm import PyMuPDF4LLMLoader

from .llm import model_for_images

def chunk_file(file_path):
    """Lädt ein PDF und zerlegt es in Seiten und Bildinhalte."""

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
    """Lädt alle PDF-Dateien in einem Verzeichnis und zerlegt sie."""
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
    Verschiebt Elemente sequenziell zwischen drei Listen.

    Args:
        first_list: Bereits bearbeitete Seiten.
        middle_list: Aktuell zu bearbeitende Seiten.
        last_list: Noch nicht bearbeitete Seiten.
        jump: Anzahl der Seiten, die in den nächsten Verarbeitungszyklus gehen.

    Returns:
        Aktualisierte erste, mittlere und letzte Liste.
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


