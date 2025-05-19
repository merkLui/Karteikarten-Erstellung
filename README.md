<!-- README komplett überarbeitet -->
# KI-gestützte Karteikarten-Erstellung

**Automatische Generierung von Frage-Antwort-Karteikarten aus PDF-Dokumenten über eine REST-API mit Web-Interface.**

---

## Features

- Upload von PDFs per HTTP-Endpoint oder über ein integriertes Web-Frontend
- KI-basierte Umwandlung in Frage-Antwort-Karteikarten mit Quellenangabe und LaTeX-Formeln
- Ausgabe der Karteikarten als Download im CSV-Format
- Einfache Authentifizierung via API-Key-Header
- Bereitstellung von Health-Check und statischen Assets

## Projektstruktur

```
root/
├── data/
│   ├── Vorlesungsunterlagen/   ← Eingabe-PDFs
│   └── Karteikarten/           ← Ausgabe-CSV-Dateien
├── main/                       ← Python-Backend (FastAPI)
│   ├── ai.py
│   ├── api.py
│   ├── chunk.py
│   ├── llm.py
│   ├── prompt.py
│   ├── web/                    ← Statisches Web-Frontend (HTML/CSS/JS)
│   └── ...
├── requirements.txt            ← Python-Abhängigkeiten
└── README.md                   ← Projektbeschreibung
```

## Voraussetzungen

- Python 3.8 oder höher
- `pip` zum Installieren der Abhängigkeiten
- (Optional) Virtual Environment

## Einrichtung

1. Repository klonen:
   ```bash
   git clone <URL> lern-app
   cd lern-app
   ```
2. Virtuelle Umgebung anlegen & aktivieren:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # Windows: .venv\Scripts\activate
   ```
3. Abhängigkeiten installieren:
   ```bash
   pip install -r requirements.txt
   ```
4. Umgebungsvariablen setzen in der .env setzten:
   ```bash
   export AZURE_OPENAI_ENDPOINT="<endpoint>"
   export AZURE_OPENAI_API_KEY="<key>"
   ```

## API starten

Setze die FastAPI-Server API:

```bash
export API_KEY="mein-geheimer-key"
```

Starte den FastAPI-Server mit:
```bash
uvicorn main.api:app --host 0.0.0.0 --port 8000 --reload
```

## Nutzung

### Web-Frontend

1. Browser öffnen unter `http://localhost:8000/`
2. API-Key eingeben
3. PDF auswählen und optional Nutzeranweisungen ergänzen
4. Klick auf **Generieren** → CSV-Download startet automatisch

### Curl-Beispiel

```bash
curl -X POST "http://localhost:8000/generate" \
     -H "X-API-Key: $API_KEY" \
     -F file=@"./data/Vorlesungsunterlagen/beispiel.pdf" \
     -F user_instructions="Optionale Hinweise"
```

Die Antwort ist eine CSV-Datei mit den Karteikarten.

## Deployment

Empfohlen für Testzwecke: Azure App Service oder Functions. Einfache Containerisierung per Docker möglich.

## Lizenz & Haftungsausschluss

Nur zu Demonstrationszwecken. Nutzung auf eigenes Risiko.
