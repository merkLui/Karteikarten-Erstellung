# KI-gestützte Karteikarten-Erstellung


### Einrichtung

1.  **Projektverzeichnis wechseln:**

   ```bash
   cd /pfad/zu/Lern-App
   ```

2.  **Virtuelle Umgebung erstellen und aktivieren:**

   ```bash
   python -m venv .venv
   source .venv/bin/activate  # Unter Windows: .venv\Scripts\activate
   ```

3.  **Abhängigkeiten installieren:**

   ```bash
   pip install -r requirements.txt
   ```

## Vorbereitung

1. **Verzeichnisstruktur erstellen:**

   Stelle sicher, dass folgende Verzeichnisse existieren:
   ```bash
   mkdir -p ./data/Vorlesungsunterlagen
   mkdir -p ./data/Karteikarten
   ```

2. **Konfiguration einrichten:**

   Erstelle eine `.env` Datei im Hauptverzeichnis:
   ```bash
   cd ./main
   touch .env
   ```

   Lege folgende Dinge ab:
   AZURE_OPENAI_ENDPOINT=""
   AZURE_OPENAI_API_KEY=""

3. **PDF-Dokumente platzieren:**

   Lege deine PDF-Dokumente im Verzeichnis `./data/Vorlesungsunterlagen` ab.

## Verwendung

1. **Anwendung ausführen:**

 1. API KEY festelegen
   ```bash
   export API_KEY="mein-geheimer-key"
   ```
2. API Starten:
   ```bash
uvicorn main.api:app --host 0.0.0.0 --port 8000 --reload
   ```

   
 3. Check ob api gut klappt:

    ```bash
curl http://localhost:8000/health
   ```

4. 

ausführung Website:

    ```bash
uvicorn main.api:app --reload
   ```
