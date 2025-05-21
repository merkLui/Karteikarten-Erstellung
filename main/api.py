from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Depends, Request  # Request importieren
from fastapi.security.api_key import APIKeyHeader, APIKey
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles  # neu importieren
import os
import uuid
import tempfile
import json  # neu importieren

from .chunk import chunk_file, jump_through_lists, save_index_cards_as_csv
from .ai import graph

# API-Key Konfiguration
default_api_key = os.getenv("API_KEY", "testkey")
API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)

async def get_api_key(api_key_header: str = Depends(api_key_header)) -> APIKey:
    if api_key_header == default_api_key:
        return api_key_header
    raise HTTPException(status_code=401, detail="Unauthorized")

app = FastAPI(
    title="Index Card Generator API",
    version="1.0",
    description="Automatische Generierung von Frage-Antwort-Karteikarten aus PDF-Dokumenten."
)

@app.post("/generate", summary="Generiert Karteikarten als CSV aus einem PDF", response_class=FileResponse)
async def generate(
    file: UploadFile = File(..., description="PDF-Datei"),
    user_instructions: str = Form("", description="Zusätzliche Nutzeranweisungen"),
    api_key: APIKey = Depends(get_api_key)
):
    # Dateityp prüfen
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Ungültiger Dateityp, bitte PDF hochladen.")
    # Temporäre Datei
    suffix = os.path.splitext(file.filename)[1]
    tmp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
    data = await file.read()
    tmp_pdf.write(data)
    tmp_pdf.close()
    # Dokument in Seiten und Bilder aufteilen
    first_pages = []
    target_pages = []
    print("Dokument wird eingelesen...")
    try:
        last_pages = chunk_file(tmp_pdf.name)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Fehler beim Einlesen des Dokuments: {e}"
        )
    print("Dokument eingelesen und in Seiten aufgeteilt.")

    all_index_cards = []

    while len(last_pages) > 0:
        print(f"{len(first_pages)}/{len(target_pages) + len(first_pages) + len(last_pages)} Seiten verarbeitet.")

        first_pages, target_pages, last_pages = jump_through_lists([], [], last_pages, jump=5)
        initial_state = {
            "first_pages": first_pages,
            "target_pages": target_pages,
            "last_pages": last_pages,
            "user_instructions": user_instructions,
            "all_index_cards": all_index_cards
        }

        # Graph ausführen mit Error-Handling
        try:
            result = graph.invoke(initial_state, {"recursion_limit": 100})
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Fehler beim LLM-Aufruf: {e}"
            )

        all_index_cards = result.get("all_index_cards", [])
        first_pages = result.get("first_pages", [])
        target_pages = result.get("target_pages", [])
        last_pages = result.get("last_pages", [])

    
    # CSV erzeugen
    tmp_dir = tempfile.mkdtemp()
    csv_name = f"{uuid.uuid4()}.csv"
    save_index_cards_as_csv(all_index_cards, csv_name, tmp_dir)
    csv_path = os.path.join(tmp_dir, csv_name)
    return FileResponse(path=csv_path, filename=csv_name, media_type="text/csv")

@app.get("/health", summary="Health-Check der API")
def health_check():
    return {"status": "ok"}

# Statische Website bereitstellen
import os  # already vorhanden
web_dir = os.path.join(os.path.dirname(__file__), "web")
app.mount("/", StaticFiles(directory=web_dir, html=True), name="static")