<!-- README komplett überarbeitet -->
# KI-gestützte Karteikarten-Erstellung

Eine leicht bedienbare Anwendung zum automatischen Erstellen von Frage-Antwort-Karteikarten aus PDF-Dokumenten.

## Was macht dieses Projekt?
- **PDF-Upload**: Lade deine Vorlesungsunterlagen hoch.
- **KI-gestützte Generierung**: Die Anwendung erstellt automatisch Karteikarten (Frage bzw. Antwort) mit Quellenangabe und Formeln.
- **CSV-Download**: Lade die fertigen Karteikarten als CSV-Datei herunter und nutze sie in deinem Lerntool.
- **Schnelle Installation**: Keine Programmierkenntnisse nötig, einfache Anleitung.

---

## Voraussetzungen
- Ein Computer mit Windows, macOS oder Linux
- Internetzugang (für KI-Aufrufe)
- PDF-Datei mit Lerninhalten

> **Hinweis:** Alles Weitere läuft in einem einzelnen Terminalfenster ab. Du benötigst keine Kenntnisse in Python oder Serverbetrieb.

---

## Schritt-für-Schritt-Anleitung

1. **Projekt herunterladen**

   - Klicke oben auf **Code** und lade das Repository als ZIP herunter.
   - Entpacke die ZIP-Datei an einem Ort deiner Wahl.

2. **Terminal öffnen**

   - Windows: Öffne die **Eingabeaufforderung** (cmd) oder **PowerShell**.
   - macOS: Öffne die **Terminal-App**.
   - Linux: Öffne dein bevorzugtes Terminal.

3. **Verzeichnis wechseln**

   Tippe im Terminal:
   ```bash
   cd PFAD/ZUM/ENTPACKTEN/ORDNER
   ```
   Ersetze `PFAD/ZUM/ENTPACKTEN/ORDNER` mit dem tatsächlichen Pfad.

4. **Virtuelle Umgebung erstellen (einmalig)**

   ```bash
   python -m venv .venv
   ```
   
5. **Umgebung aktivieren**

   - Windows:
     ```bash
     .venv\Scripts\activate
     ```
   - macOS/Linux:
     ```bash
     source .venv/bin/activate
     ```

6. **Abhängigkeiten installieren**

   ```bash
   pip install -r requirements.txt
   ```

7. **Umgebungsvariablen setzen**

   ```bash
   export API_KEY="DEIN-API-KEY"
   export AZURE_OPENAI_ENDPOINT="DEIN-ENDPOINT"
   export AZURE_OPENAI_API_KEY="DEIN-SCHLÜSSEL"
   ```
   - Auf Windows in PowerShell statt `export` nutze:
     ```powershell
     setx API_KEY "DEIN-API-KEY"
     setx AZURE_OPENAI_ENDPOINT "DEIN-ENDPOINT"
     setx AZURE_OPENAI_API_KEY "DEIN-SCHLÜSSEL"
     ```

8. **Anwendung starten**

   ```bash
   uvicorn main.api:app --host 0.0.0.0 --port 8000 --reload
   ```

9. **Web-Interface öffnen**

   - Öffne deinen Browser unter:
     ```text
     http://localhost:8000/
     ```
   - Gib deinen API-Key ein, lade eine PDF hoch und klicke auf **Generieren**.

10. **CSV herunterladen**

    Nach erfolgreicher Verarbeitung startet automatisch der Download deiner Karteikarten.

---

## Alternative: Kommandozeile (curl)

Falls du lieber direkt im Terminal arbeitest:

```bash
curl -X POST http://localhost:8000/generate \
  -H "X-API-Key: $API_KEY" \
  -F file=@"Pfad/zur/Datei.pdf" \
  -F user_instructions="Optionale Hinweise"
```


---

## Hilfe & Support

Bei Problemen:
- Kontrolliere, ob deine Umgebungsvariablen korrekt gesetzt sind.
- Achte auf PDF-Dateien ohne ungewöhnliche Passwörter oder Schutzmechanismen.
- Suche in den Logs des Terminals nach Fehlermeldungen.

---

© 2025 KI-gestützte Karteikarten-Erstellung – Nutzung auf eigenes Risiko.
