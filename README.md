<!-- README – an aktuelle Version angepasst -->
# 🧠 KI-gestützte Karteikarten-Erstellung

Eine schlanke Web-App, die aus deinen PDF-Unterlagen automatisch Frage-Antwort-Karteikarten erzeugt!

---

## ✨ Features

| Feature                 | Beschreibung                                                                                              |
| :---------------------- | :-------------------------------------------------------------------------------------------------------- |
| 📄 **PDF-Upload**       | Zieh deine Vorlesungs-, Skript- oder Foliensammlung per Drag-and-Drop ins Web-Interface.                  |
| 🤖 **KI-Generierung**   | Erstellt automatisch Karteikarten mit Frage, Antwort, Quellenangabe und Formeln.                        |
| 📊 **Live-Fortschritt & Vorschau** | Fortschrittsbalken + wachsende Tabelle zeigen dir schon während der Verarbeitung jede neue Karte. |
| 💾 **CSV-Export**       | Lade die fertigen (oder bereits teilweise erzeugten) Karteikarten als CSV herunter und importiere sie in Anki & Co. |
| 🚑 **Robust bei Abbruch** | Bricht die Verbindung bei 50 % ab, kannst du die bis dahin generierten Karten trotzdem speichern.        |
| ⚡ **Schnelle Installation** | Keine Python-Vorkenntnisse nötig – ein Terminalfenster genügt.                                        |

---

## 🖥️ Voraussetzungen

*   Windows, macOS oder Linux
*   Internetverbindung (für die KI-Aufrufe)
*   Eine PDF-Datei mit Lerninhalten

> ℹ️ Alles Weitere geschieht in **einem** Terminalfenster – du musst weder Python-Code schreiben noch einen Web-Server konfigurieren.

---

## 🚀 Schnellstart

1.  **Verzeichnis wechseln**

    ```bash
    cd PFAD/ZUM/GITHUBREPO/Karteikarten-Erstellung
    ```

    Ersetze `PFAD/ZUM/GITHUBREPO/Karteikarten-Erstellung` durch deinen tatsächlichen Pfad.

2.  **Virtuelle Umgebung erstellen (einmalig)**

    ```bash
    python -m venv .venv
    ```

3.  **Umgebung aktivieren**

    *   **Windows:**
        ```bash
        .venv\Scripts\activate
        ```
    *   **macOS / Linux:**
        ```bash
        source .venv/bin/activate
        ```

4.  **Abhängigkeiten installieren**

    ```bash
    pip install -r requirements.txt
    ```

5.  **Umgebungsvariablen setzen**

    **Variante A – manuell im Terminal (bei jedem neuen Terminalfenster)**

    *   **macOS / Linux:**
        ```bash
        export API_KEY="DEIN-API-KEY"
        export AZURE_OPENAI_ENDPOINT="DEIN-ENDPOINT"
        export AZURE_OPENAI_API_KEY="DEIN-SCHLÜSSEL"
        ```
    *   **Windows (PowerShell):**
        ```powershell
        setx API_KEY "DEIN-API-KEY"
        setx AZURE_OPENAI_ENDPOINT "DEIN-ENDPOINT"
        setx AZURE_OPENAI_API_KEY "DEIN-SCHLÜSSEL"
        ```

    **Variante B – per `.env`-Datei (empfohlen)**

    1.  Wechsle in das Hauptverzeichnis der App:
        ```bash
        cd Karteikarten-Erstellung/main/
        ```
    2.  `.env`-Datei anlegen:
        *   **macOS / Linux:**
            ```bash
            touch .env
            ```
        *   **Windows (PowerShell):**
            ```powershell
            New-Item -Name .env -ItemType File
            ```
    3.  Inhalt der `.env`-Datei:
        ```env
        API_KEY="DEIN-API-KEY"
        AZURE_OPENAI_ENDPOINT="DEIN-ENDPOINT"
        AZURE_OPENAI_API_KEY="DEIN-SCHLÜSSEL"
        ```

6.  **Anwendung starten**

    ```bash
    uvicorn main.api:app --host 0.0.0.0 --port 8000 --reload
    ```

7.  **Web-Interface öffnen**

    Öffne [http://localhost:8000/](http://localhost:8000/) in deinem Browser.

    1.  API-Key eingeben
    2.  PDF hochladen
    3.  "Generieren" klicken – die Tabelle füllt sich live

8.  **CSV herunterladen**

    Über "CSV herunterladen" kannst du jederzeit das aktuelle Ergebnis sichern – auch wenn der Prozess vorzeitig abgebrochen ist.

---

## 💡 Anki Import

So importierst du die CSV-Datei in Anki:

1.  **Stapel erstellen/auswählen:**
    *   Erstelle einen neuen Kartenstapel in Anki über "Stapel erstellen", falls die Karten in einen neuen Stapel sollen.
    *   Oder stelle sicher, dass der gewünschte Zielstapel bereits vorhanden ist.
2.  **Importdialog öffnen:**
    *   Klicke auf "Datei importieren".
3.  **CSV-Datei auswählen:**
    *   Wähle die heruntergeladene CSV-Datei aus, die du importieren möchtest.
4.  **Importeinstellungen prüfen:**
    *   **Datei:** Stelle sicher, dass beim Feld: "Feld-Trennzeichen" die Option "Semikolon" ausgewählt ist.
    *   **Einstellungen für den Import:** Prüfe, dass beim Feld: "Stapel", ob der korrekte Stapel ausgewählt ist.
5.  **Import starten und abschließen:**
    *   Klicke oben rechts auf den Knopf "Importieren".
    *   Drücke nach erfolgreichem Import so oft die `Esc`-Taste, bis du wieder im Hauptbildschirm von Anki bist.
    *   Nun kannst du den Stapel öffnen und mit deinen neuen Karteikarten lernen.

## 🆘 Hilfe & Support

*   Prüfe, ob deine Umgebungsvariablen korrekt gesetzt sind (oder die `.env`-Datei gefunden wird).
*   Vermeide passwortgeschützte oder beschädigte PDFs.
*   Sieh bei Fehlern ins Terminal – dort erscheinen detaillierte Logs.

---

© 2025 – KI-gestützte Karteikarten-Erstellung · Nutzung auf eigenes Risiko.

