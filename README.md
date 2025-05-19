# KI-gestützte Lern-App

Diese Anwendung nutzt künstliche Intelligenz, um automatisch hochwertige Karteikarten zur Prüfungsvorbereitung zu erstellen. Sie verarbeitet PDF-Dokumente und generiert intelligente, lerngerechte Karteikarten.

## Features

-   **Automatische PDF-Verarbeitung:** Konvertiert PDF-Dokumente in Karteikarten.
-   **Intelligente Karteikartenerstellung:** Erzeugt Frage-Antwort-Paare, die auf den Inhalten der Dokumente basieren.
-   **Redundanzvermeidung:** Minimiert Wiederholungen in den erstellten Karteikarten.
-   **Bildanalyse:** Extrahiert und analysiert Bilder aus den Dokumenten.
-   **Mathematische Funktionen:** Unterstützt mathematische Berechnungen für komplexere Inhalte.

## Technische Grundlagen

Die App basiert auf folgenden Technologien:

-   **Google Generative AI (Gemini 2.0):** Für die KI-gestützte Textanalyse und -generierung.
-   **LangChain Framework:** Für die Orchestrierung der verschiedenen KI-Komponenten.
-   **LangGraph:** Für das Zustandsmanagement innerhalb der Anwendung.
-   **PyMuPDF:** Für die Verarbeitung von PDF-Dateien.

## Installation

### Voraussetzungen

-   Python 3.11 oder höher (empfohlen: 3.12)
-   Pip (Paketmanager für Python)

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

   Erstelle eine `config.yml` Datei im Hauptverzeichnis:
   ```yaml
   google_api_key: "dein-api-schlüssel-hier"
   ```

3. **PDF-Dokumente platzieren:**

   Lege deine PDF-Dokumente im Verzeichnis `./data/Vorlesungsunterlagen` ab.

## Verwendung

1. **Anwendung ausführen:**

   ```bash
   python -m main.manuell_execute
   ```

2. **Karteikarten einsehen:**

   Die generierten Karteikarten werden als CSV-Dateien im Verzeichnis `./data/Karteikarten` gespeichert und können mit jedem Tabellenkalkulationsprogramm oder Texteditor geöffnet werden.

## Projektstruktur

```
Lern-App/
├── main/
│   ├── ai.py       # Hauptlogik, Zustandsmanagement
│   ├── chunk.py    # Dokumentenverarbeitung, Chunking
│   └── prompt.py   # Prompts, Datenstrukturen
├── data/
│   ├── Vorlesungsunterlagen/  # PDF-Dokumente
│   └── Karteikarten/          # Generierte CSV-Dateien
├── config.yml      # Konfigurationsdatei (API-Schlüssel)
└── requirements.txt
```

## Anpassung

Passe die Anwendung an deine Bedürfnisse an:

-   **Prompt-Templates:** Modifiziere die Prompt-Templates in `main/prompt.py` für andere Lernbereiche.
-   **Chunk-Größe:** Passe die Chunk-Größe und Verarbeitungsparameter in `main/ai.py` an.

## API-Schlüssel

Die Anwendung benötigt einen Google Generative AI API-Schlüssel.

1.  **API-Schlüssel beziehen:**  Besorge dir einen eigenen API-Schlüssel im [Google AI Studio](https://ai.google.dev/).
2.  **API-Schlüssel konfigurieren:**  Speichere den Schlüssel in der `config.yml` Datei.

## Fehlerbehebung

-   **Virtuelle Umgebung:** Stelle sicher, dass die virtuelle Umgebung aktiviert ist.
-   **Abhängigkeiten:** Überprüfe, ob alle Abhängigkeiten installiert sind.
-   **API-Schlüssel:** Vergewissere dich, dass du einen gültigen API-Schlüssel in der `config.yml` hinterlegt hast.
-   **Datenverzeichnis:** Stelle sicher, dass das Datenverzeichnis existiert und PDF-Dokumente enthält.
-   **YAML-Bibliothek:** Falls der Fehler "No module named 'yaml'" auftritt, installiere PyYAML mit `pip install pyyaml`.

## Lizenz

[Hier Lizenzinformationen einfügen, falls zutreffend]

## Kontakt

[Hier Kontaktinformationen einfügen, falls zutreffend]

