import os
import requests

# Pfade und Konfiguration
API_URL = os.getenv("API_URL", "http://localhost:8000")
API_KEY = os.getenv("API_KEY", "testkey")
HEADERS = {"X-API-Key": API_KEY}
INPUT_DIR = os.path.join(os.path.dirname(__file__), "../data/Vorlesungsunterlagen/")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "../data/Karteikarten/")
USER_INSTRUCTIONS = "Es gibt keine speziellen Anweisungen vom Nutzer."

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Alle PDF-Dateien im Input-Verzeichnis auflisten
for fname in os.listdir(os.path.abspath(INPUT_DIR)):
    if not fname.lower().endswith(".pdf"):
        continue
    pdf_path = os.path.join(INPUT_DIR, fname)
    print(f"Verarbeite {fname}...")

    with open(pdf_path, "rb") as f:
        files = {"file": (fname, f, "application/pdf")}
        data = {"user_instructions": USER_INSTRUCTIONS}
        response = requests.post(
            f"{API_URL}/generate",
            headers=HEADERS,
            files=files,
            data=data,
        )
    if response.status_code != 200:
        print(f"Fehler bei der API-Anfrage für {fname}: {response.status_code} - {response.text}")
        continue

    csv_name = os.path.splitext(fname)[0] + ".csv"
    out_path = os.path.join(OUTPUT_DIR, csv_name)
    with open(out_path, "wb") as out_f:
        out_f.write(response.content)
    print(f"Erfolgreich gespeichert: {out_path}")


