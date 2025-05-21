// app.js - Frontend-Logik für den Karteikarten-Generator: Formular-Verarbeitung, API-Aufrufe und Fortschrittsanzeige

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('uploadForm');
  const pdfInput = document.getElementById('pdfFile');
  const instructionsInput = document.getElementById('instructions');
  const apiKeyInput = document.getElementById('apiKey');
  const progressDiv = document.getElementById('progress');

  // Formular-Submit behandeln und API-Aufruf ausführen
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    progressDiv.innerHTML = '';
    const file = pdfInput.files[0];
    const pdfName = file.name;
    const instructions = instructionsInput.value;
    const apiKey = apiKeyInput.value.trim();

    if (!file) {
      progressDiv.innerHTML = '<div class="alert alert-warning">Bitte eine PDF-Datei auswählen.</div>';
      return;
    }
    if (!apiKey) {
      progressDiv.innerHTML = '<div class="alert alert-warning">Bitte API-Key eingeben.</div>';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_instructions', instructions);

    progressDiv.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Lädt...</span></div> Generierung läuft...';

    // Anfrage an '/generate'-Endpoint senden
    try {
      const response = await fetch('/generate', {
        method: 'POST',
        headers: { 'X-API-Key': apiKey },
        body: formData
      });

      // Fehlerstatus abfangen und anzeigen
      if (!response.ok) {
        const errorText = await response.text();
        progressDiv.innerHTML = `<div class="alert alert-danger">Fehler: ${response.status} - ${errorText}</div>`;
        return;
      }

      // Empfange CSV-Daten und starte Download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      // Verwende den PDF-Dateinamen für die CSV (Ersetze .pdf mit .csv)
      const downloadName = pdfName.replace(/\.pdf$/i, '.csv');
      link.href = url;
      link.download = downloadName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      // Erfolgsmeldung nach abgeschlossenem Download
      progressDiv.innerHTML = '<div class="alert alert-success">CSV erfolgreich heruntergeladen.</div>';
    } catch (err) {
      // Netzwerkfehler behandeln
      progressDiv.innerHTML = `<div class="alert alert-danger">Netzwerkfehler: ${err.message}</div>`;
    }
  });
});
