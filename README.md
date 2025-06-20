# 🧠 CyberCards - KI-gestützte Karteikarten-Erstellung

Eine moderne Next.js Web-App, die aus deinen PDF-Unterlagen automatisch interaktive Frage-Antwort-Karteikarten erzeugt!

## 🌐 Live Demo
**➡️ [https://karteikarten-webapp-1750450317.azurewebsites.net](https://karteikarten-webapp-1750450317.azurewebsites.net)**

*Probiere CyberCards direkt im Browser aus - keine Installation erforderlich!*

---

## ✨ Features

| Feature                 | Beschreibung                                                                                              |
| :---------------------- | :-------------------------------------------------------------------------------------------------------- |
| 🌐 **Web-App**          | Moderne Next.js Anwendung - läuft direkt im Browser, keine Installation nötig                           |
| 📄 **PDF-Upload**       | Zieh deine Vorlesungs-, Skript- oder Foliensammlung per Drag-and-Drop ins Web-Interface                 |
| 🤖 **KI-Generierung**   | Erstellt automatisch Karteikarten mit Frage, Antwort, Quellenangabe und Formeln                        |
| 📊 **Live-Fortschritt** | Fortschrittsbalken zeigt dir den aktuellen Verarbeitungsstand in Echtzeit                               |
| 💾 **CSV-Export**       | Lade die fertigen Karteikarten als CSV herunter und importiere sie in Anki & Co                        |
| � **Sicher & Privat**  | Deine PDFs werden sicher verarbeitet und nicht dauerhaft gespeichert                                    |
| ⚡ **Sofort nutzbar**   | Keine Installation, keine Konfiguration - einfach die Website öffnen und loslegen                       |

---

## 🖥️ Voraussetzungen

*   Ein moderner Webbrowser (Chrome, Firefox, Safari, Edge)
*   Internetverbindung
*   Eine PDF-Datei mit Lerninhalten

> ℹ️ **Keine Installation erforderlich!** CyberCards läuft komplett im Browser.

---

## 🚀 Schnellstart

### Option 1: Web-App verwenden (Empfohlen)

1. **Website öffnen**: [https://karteikarten-webapp-1750450317.azurewebsites.net](https://karteikarten-webapp-1750450317.azurewebsites.net)

2. **PDF hochladen**: Ziehe deine PDF-Datei ins Upload-Feld

3. **Generierung starten**: Klicke auf "Karteikarten generieren"

4. **Fortschritt verfolgen**: Beobachte den Live-Fortschrittsbalken

5. **CSV herunterladen**: Lade deine fertigen Karteikarten herunter

### Option 2: Lokale Entwicklung

Für Entwickler, die den Code lokal ausführen möchten:

1.  **Verzeichnis wechseln**

    ```bash
    cd PFAD/ZUM/GITHUBREPO/Karteikarten-Erstellung/karteikarten-webapp
    ```

2.  **Dependencies installieren**

    ```bash
    npm install
    ```

3.  **Umgebungsvariablen setzen**

    Erstelle eine `.env.local` Datei:
    ```env
    API_KEY="DEIN-API-KEY"
    AZURE_OPENAI_ENDPOINT="DEIN-ENDPOINT"
    AZURE_OPENAI_API_KEY="DEIN-SCHLÜSSEL"
    ```

4.  **Development Server starten**

    ```bash
    npm run dev
    ```

5.  **Web-Interface öffnen**

    Öffne [http://localhost:3000](http://localhost:3000) in deinem Browser.

---

## 🌐 Live Web-App nutzen

**Einfach die Website besuchen: [https://karteikarten-webapp-1750450317.azurewebsites.net](https://karteikarten-webapp-1750450317.azurewebsites.net)**

1.  **PDF hochladen**: Ziehe deine PDF-Datei ins Upload-Feld oder klicke zum Durchsuchen
2.  **Generierung starten**: Klicke auf "Karteikarten generieren"
3.  **Fortschritt verfolgen**: Der Fortschrittsbalken zeigt den aktuellen Status
4.  **CSV herunterladen**: Sobald fertig, lade deine Karteikarten als CSV herunter

---

## 📱 Technologie

- **Frontend**: Next.js 15 mit TypeScript
- **Styling**: Tailwind CSS + shadcn/ui Components  
- **Deployment**: Azure App Service
- **KI**: Azure OpenAI Integration
- **Upload**: Moderne File Upload mit Progress Tracking

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

### Web-App Probleme
- **Upload funktioniert nicht**: Überprüfe deine Internetverbindung und probiere eine kleinere PDF-Datei
- **Generierung stoppt**: Lade die Seite neu und versuche es erneut
- **Leere Karteikarten**: Stelle sicher, dass deine PDF-Datei lesbaren Text enthält (keine gescannten Bilder)

### Lokale Entwicklung
- Überprüfe, ob deine Umgebungsvariablen in `.env.local` korrekt gesetzt sind
- Vermeide passwortgeschützte oder beschädigte PDFs
- Sieh bei Fehlern ins Terminal – dort erscheinen detaillierte Logs

### Deployment
Siehe [AZURE_DEPLOYMENT.md](AZURE_DEPLOYMENT.md) für Deployment-Anweisungen.

---

## 📁 Projektstruktur

```
├── karteikarten-webapp/     # Next.js Web-App
│   ├── app/                # App Router
│   ├── components/         # React Components
│   ├── public/            # Static Assets (Favicons)
│   └── ...
├── main/                  # Legacy Python Backend
├── AZURE_DEPLOYMENT.md    # Deployment Guide
└── quick-deploy.sh       # Deployment Script
```

---

© 2025 – CyberCards · Powered by Next.js & Azure OpenAI

