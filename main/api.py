"""API-Modul zur Generierung von Frage-Antwort-Karteikarten aus PDF-Dateien."""

from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Depends
from fastapi.security.api_key import APIKeyHeader, APIKey
from fastapi.responses import StreamingResponse
import os, tempfile, json
from typing import List, Dict
import hashlib, hmac

from .chunk import chunk_file, jump_through_lists
from .ai import graph

# ---------------------------------------------------------------------------#
# API-Key
# ---------------------------------------------------------------------------#
API_KEY_NAME    = "X-API-Key"
api_key_header  = APIKeyHeader(name=API_KEY_NAME, auto_error=False)


# Überprüft den mitgesendeten API-Key und verweigert bei Abweichung den Zugriff
async def get_api_key(api_key_header: str = Depends(api_key_header)) -> APIKey:
    if not api_key_header:
        raise HTTPException(status_code=401, detail="Unauthorized")
    # Vergleiche gehashten Header mit gespeichertem Hash
    api_key_hash = os.getenv("API_KEY_HASH", "")
    provided_hash = hashlib.sha256(api_key_header.encode()).hexdigest()
    if hmac.compare_digest(provided_hash, api_key_hash):
        return api_key_header
    raise HTTPException(status_code=401, detail="Unauthorized")

# ---------------------------------------------------------------------------#
# FastAPI-App
# ---------------------------------------------------------------------------#
app = FastAPI(
    title="Index Card Generator API",
    version="1.4",
    description="Generiert Karteikarten aus PDF mit Live-Progress.",
)

# ---------------------------------------------------------------------------#
# Streaming-Endpoint
# ---------------------------------------------------------------------------#
@app.post("/generate-stream", response_class=StreamingResponse, summary="Stream")
async def generate_stream(
    file: UploadFile = File(...),
    user_instructions: str = Form(""),
    api_key: APIKey = Depends(get_api_key),
):
    # Stelle sicher, dass nur PDFs akzeptiert werden
    if file.content_type != "application/pdf":
        return StreamingResponse(
            (json.dumps({"type": "error", "message": "PDF erwartet"}) + "\n",),
            media_type="text/plain",
        )

    # Lese den Upload vollständig ein und bestimme Dateiendung
    pdf_bytes = await file.read()
    suffix    = os.path.splitext(file.filename or "")[1] or ".pdf"

    # Innerer Generator, der Fortschritt und Karten als Text-Stream liefert
    async def card_generator():
        # Sofort 0 % Fortschritt ausliefern
        yield json.dumps({"type": "progress", "percent": 0}) + "\n"

        # Schreibe PDF-Bytes in temporäre Datei für Verarbeitung
        tmp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
        tmp_pdf.write(pdf_bytes)
        tmp_pdf.close()

        try:
            # Zerlege PDF in Seiten und Inhaltsblöcke
            first_pages, target_pages, last_pages = [], [], chunk_file(tmp_pdf.name)
        except Exception as e:
            # Beim Fehler im Chunking-Einsatz ein Error-Event streamen
            yield json.dumps({"type": "error", "message": str(e)}) + "\n"
            return

        total_pages = len(last_pages)
        # Nach erfolgreichem Einlesen 15 % Fortschritt melden
        yield json.dumps({"type": "progress", "percent": 15}) + "\n"

        all_cards: List[Dict[str, str]] = []
        prev_len = 0

        # Solange noch Seiten übrig sind, neue Karteikarten generieren
        while last_pages:
            # Nächsten Block Seiten zum Verarbeiten auswählen
            first_pages, target_pages, last_pages = jump_through_lists(
                first_pages, target_pages, last_pages, jump=5
            )
            state = {
                "first_pages":       first_pages,
                "target_pages":      target_pages,
                "last_pages":        last_pages,
                "user_instructions": user_instructions,
                "all_index_cards":   all_cards,
            }
            try:
                # KI-Graph mit aktuellem State aufrufen
                res = graph.invoke(state, {"recursion_limit": 100})
            except Exception as e:
                yield json.dumps({"type": "error", "message": str(e)}) + "\n"
                return

            # Aktualisiere lokalen Status mit Ergebnissen aus dem Graphen
            all_cards    = res["all_index_cards"]
            first_pages  = res["first_pages"]
            target_pages = res["target_pages"]
            last_pages   = res["last_pages"]

            # Neue Karteikarten seit dem letzten Zyklus streamen
            for c in all_cards[prev_len:]:
                q = c.get("question", "").strip()
                a = c.get("answer",   "").rstrip()
                s = c.get("source",   "").strip()

                if s:
                    if a and a[-1] not in ".!?":
                        a += "."
                    a += f"\n\nQuelle: {s}"

                yield json.dumps({"type": "card", "question": q, "answer": a}) + "\n"
            prev_len = len(all_cards)

            # Berechne Fortschritt basierend auf bereits verarbeiteten Seiten
            done_pages = total_pages - len(last_pages)
            percent = 15 + int(done_pages / max(total_pages, 1) * 85)
            yield json.dumps({"type": "progress", "percent": percent}) + "\n"

        # Alle Seiten verarbeitet, Done-Event senden
        yield json.dumps({"type": "done"}) + "\n"

    return StreamingResponse(card_generator(), media_type="text/plain")

# ---------------------------------------------------------------------------#
# Health-Check & statische Dateien
# ---------------------------------------------------------------------------#
@app.get("/health")
def health_check():
    return {"status": "ok"}

