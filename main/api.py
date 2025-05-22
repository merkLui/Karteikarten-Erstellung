"""API-Modul zur Generierung von Frage-Antwort-Karteikarten aus PDF-Dateien."""

from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Depends
from fastapi.security.api_key import APIKeyHeader, APIKey
from fastapi.responses import FileResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
import os, uuid, tempfile, json
from typing import List, Dict

from .chunk import chunk_file, jump_through_lists, save_index_cards_as_csv
from .ai import graph

# ---------------------------------------------------------------------------#
# API-Key
# ---------------------------------------------------------------------------#
default_api_key = os.getenv("API_KEY", "testkey")
API_KEY_NAME = "X-API-Key"
api_key_header = APIKeyHeader(name=API_KEY_NAME, auto_error=False)


async def get_api_key(api_key_header: str = Depends(api_key_header)) -> APIKey:
    if api_key_header == default_api_key:
        return api_key_header
    raise HTTPException(status_code=401, detail="Unauthorized")


# ---------------------------------------------------------------------------#
# FastAPI-Instanz
# ---------------------------------------------------------------------------#
app = FastAPI(
    title="Index Card Generator API",
    version="1.3",
    description=(
        "Automatische Generierung von Frage-Antwort-Karteikarten aus PDF "
        "mit optionalem Streaming-Fortschritt."
    ),
)

# ---------------------------------------------------------------------------#
# Streaming-Endpoint – sendet Prozent­fortschritt
# ---------------------------------------------------------------------------#
@app.post("/generate-stream", response_class=StreamingResponse, summary="Stream")
async def generate_stream(
    file: UploadFile = File(...),
    user_instructions: str = Form(""),
    api_key: APIKey = Depends(get_api_key),
):
    if file.content_type != "application/pdf":
        return StreamingResponse(
            (json.dumps({"type": "error", "message": "PDF erwartet"}) + "\n",),
            media_type="text/plain",
        )

    pdf_bytes = await file.read()
    suffix = os.path.splitext(file.filename or "")[1] or ".pdf"

    async def card_generator():
        # 0 % – sofort
        yield json.dumps({"type": "progress", "percent": 0}) + "\n"

        # Temp-Datei anlegen + chunk_file
        tmp_pdf = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
        tmp_pdf.write(pdf_bytes)
        tmp_pdf.close()

        try:
            first_pages, target_pages, last_pages = [], [], chunk_file(tmp_pdf.name)
        except Exception as e:
            yield json.dumps({"type": "error", "message": str(e)}) + "\n"
            return

        total_pages = len(last_pages)
        yield json.dumps({"type": "progress", "percent": 15}) + "\n"  # PDF fertig eingelesen

        all_cards: List[Dict[str, str]] = []
        prev_len = 0

        while last_pages:
            first_pages, target_pages, last_pages = jump_through_lists(
                first_pages, target_pages, last_pages, jump=5
            )
            state = {
                "first_pages": first_pages,
                "target_pages": target_pages,
                "last_pages": last_pages,
                "user_instructions": user_instructions,
                "all_index_cards": all_cards,
            }
            try:
                res = graph.invoke(state, {"recursion_limit": 100})
            except Exception as e:
                yield json.dumps({"type": "error", "message": str(e)}) + "\n"
                return

            all_cards = res["all_index_cards"]
            first_pages, target_pages, last_pages = (
                res["first_pages"],
                res["target_pages"],
                res["last_pages"],
            )

            # neue Karten ausgeben
            for c in all_cards[prev_len:]:
                yield json.dumps(
                    {
                        "type": "card",
                        "question": c.get("question", ""),
                        "answer": c.get("answer", ""),
                    }
                ) + "\n"
            prev_len = len(all_cards)

            # Prozent berechnen (15 % Basis + 85 % Seiten)
            done_pages = total_pages - len(last_pages)
            percent = 15 + int(done_pages / max(total_pages, 1) * 85)
            yield json.dumps({"type": "progress", "percent": percent}) + "\n"

        yield json.dumps({"type": "done"}) + "\n"

    return StreamingResponse(card_generator(), media_type="text/plain")


# ---------------------------------------------------------------------------#
# Health-Check & statisches Frontend
# ---------------------------------------------------------------------------#
@app.get("/health")
def health_check():
    return {"status": "ok"}


web_dir = os.path.join(os.path.dirname(__file__), "web")
app.mount("/", StaticFiles(directory=web_dir, html=True), name="static")