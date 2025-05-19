import os
from fastapi import FastAPI, UploadFile, File, Form, BackgroundTasks
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid

from main.chunk import chunk_file, save_index_cards_as_csv
from main.ai import graph
from main.ai import jump_through_lists

app = FastAPI(title="Karteikarten-Generator API")

# CORS-Konfiguration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In Produktion einschränken!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Sicherstellen, dass Upload-Verzeichnis existiert
UPLOAD_DIR = "./static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

class FlashcardResponse(BaseModel):
    job_id: str
    message: str

class Flashcard(BaseModel):
    question: str
    answer: str
    source: str

# In-Memory Job-Status-Tracking (für Produktion: Redis/DB verwenden)
jobs = {}

@app.post("/upload-pdf", response_model=FlashcardResponse)
async def upload_pdf(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    instructions: Optional[str] = Form("Es gibt keine speziellen Anweisungen vom Nutzer.")
):
    job_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{job_id}_{file.filename}")
    
    # PDF speichern
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    
    # Karteikarten im Hintergrund generieren
    background_tasks.add_task(generate_flashcards, job_id, file_path, instructions)
    
    return {
        "job_id": job_id,
        "message": "PDF erfolgreich hochgeladen. Karteikarten werden generiert."
    }

@app.get("/job-status/{job_id}")
async def job_status(job_id: str):
    if job_id not in jobs:
        return JSONResponse(status_code=404, content={"message": "Job nicht gefunden"})
    
    return jobs[job_id]

@app.get("/flashcards/{job_id}", response_model=List[Flashcard])
async def get_flashcards(job_id: str):
    if job_id not in jobs or jobs[job_id]["status"] != "completed":
        return JSONResponse(
            status_code=404, 
            content={"message": "Karteikarten nicht gefunden oder noch nicht fertig"}
        )
    
    return jobs[job_id]["flashcards"]

def generate_flashcards(job_id: str, file_path: str, instructions: str):
    try:
        # Status aktualisieren
        jobs[job_id] = {"status": "processing", "progress": 0}
        
        # PDF chunken
        doc = chunk_file(file_path)
        
        # Karteikarten generieren (wie in deinem ai.py)
        # Passe deine bestehende Logik hier an

        
        first_pages, target_pages, last_pages = jump_through_lists([], [], doc, jump=5)
        
        initial_state = {
            "last_pages": last_pages,
            "target_pages": target_pages,
            "first_pages": first_pages,
            "user_instructions": instructions,
            "all_index_cards": [],
            "staged_index_cards": [],
        }
        
        # Graph ausführen
        results = graph.invoke(initial_state, {"recursion_limit": 100})["all_index_cards"]
        
        # Ergebnisse speichern
        jobs[job_id] = {
            "status": "completed",
            "flashcards": results
        }
        
        # Optional: Als CSV speichern
        csv_filename = f"{job_id}_flashcards.csv"
        save_index_cards_as_csv(results, csv_filename, UPLOAD_DIR)
        
    except Exception as e:
        jobs[job_id] = {"status": "failed", "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)