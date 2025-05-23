// Frontend-Logik für Streaming-Progress, Live-Vorschau & Download

document.addEventListener('DOMContentLoaded', () => {
  const form        = document.getElementById('uploadForm');
  const generateBtn = document.getElementById('generateBtn');
  const pdfInput    = document.getElementById('pdfFile');
  const instrInput  = document.getElementById('instructions');
  const apiKeyInput = document.getElementById('apiKey');
  const progressDiv = document.getElementById('progress');
  const previewDiv  = document.getElementById('csvPreview');
  const downloadBtn = document.getElementById('downloadBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    /* ------------------------------------------------------------------ *
     * 1) Validierung
     * ------------------------------------------------------------------ */
    const file   = pdfInput.files[0];
    const apiKey = apiKeyInput.value.trim();
    if (!file || !apiKey) {
      progressDiv.innerHTML =
        '<div class="alert alert-warning">PDF & API-Key erforderlich.</div>';
      return;
    }

    /* ------------------------------------------------------------------ *
     * 2) UI-Reset
     * ------------------------------------------------------------------ */
    progressDiv.innerHTML   = '';
    previewDiv.style.display = 'none';
    previewDiv.innerHTML    = '';
    downloadBtn.style.display = 'none';
    generateBtn.style.display = 'none';           // Doppel-Submit verhindern

    /* ------------------------------------------------------------------ *
     * 3) Fortschrittsbalken
     * ------------------------------------------------------------------ */
    progressDiv.innerHTML = `
      <div class="progress">
        <div id="progressBar"
             class="progress-bar progress-bar-striped progress-bar-animated"
             role="progressbar" style="width:0%;"></div>
      </div>`;
    const bar = document.getElementById('progressBar');

    /* ------------------------------------------------------------------ *
     * 4) Streaming-Request
     * ------------------------------------------------------------------ */
    const formData = new FormData();
    formData.append('file', file);
    formData.append('user_instructions', instrInput.value);

    try {
      const resp = await fetch('/generate-stream', {
        method : 'POST',
        headers: { 'X-API-Key': apiKey },
        body   : formData
      });

      if (!resp.ok) {
        progressDiv.innerHTML =
          `<div class="alert alert-danger">Fehler: ${resp.status}</div>`;
        generateBtn.style.display = 'block';
        return;
      }

      /* ----------------------------------------------------------------
       * 5) Streaming-Auswertung
       * ---------------------------------------------------------------- */
      const reader   = resp.body.getReader();
      const dec      = new TextDecoder();
      const esc      = (t) => `"${String(t).replace(/"/g, '""')}"`;
      const csvRows  = [];
      let   table    = null;      // Referenz auf Live-Tabelle

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        dec.decode(value, { stream: true })
           .split('\n')
           .filter(Boolean)
           .forEach(line => {
             const d = JSON.parse(line);

             switch (d.type) {
               /* ---------------- Fortschritt ------------------------- */
               case 'progress':
                 bar.style.width = `${d.percent}%`;
                 break;

               /* ---------------- Eine Karteikarte -------------------- */
               case 'card': {
                 csvRows.push([esc(d.question), esc(d.answer)].join(';'));

                 /* Tabelle bei erster Karte erzeugen */
                 if (!table) {
                   table = document.createElement('table');
                   table.className = 'table table-striped table-bordered';
                   table.innerHTML = `
                     <thead>
                       <tr><th>Frage</th><th>Antwort</th></tr>
                     </thead>
                     <tbody></tbody>`;
                   previewDiv.appendChild(table);
                   previewDiv.style.display = 'block';
                 }

                 /* Zeile anhängen */
                 const tbody = table.querySelector('tbody');
                 const row   = document.createElement('tr');
                 row.innerHTML =
                   `<td>${d.question}</td><td>${d.answer.replace(/\n/g, '<br>')}</td>`;
                 tbody.appendChild(row);
                 break;
               }

               /* ---------------- Fehler -------------------------------- */
               case 'error':
                 progressDiv.innerHTML =
                   `<div class="alert alert-danger">${d.message}</div>`;
                 break;

               /* ---------------- Stream fertig ------------------------ */
               case 'done':
                 bar.style.width = '100%';

                 if (!table) {            // kein 'card'-Event empfangen
                   previewDiv.innerHTML =
                     '<div class="alert alert-info">Keine Karteikarten erzeugt.</div>';
                   previewDiv.style.display = 'block';
                 }

                 /* Download-Knopf aktivieren */
                 downloadBtn.style.display = 'block';
                 downloadBtn.onclick = () => {
                   const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
                   const url  = URL.createObjectURL(blob);
                   const a    = document.createElement('a');
                   a.href = url;
                   a.download = file.name.replace(/\.pdf$/i, '.csv');
                   document.body.appendChild(a);
                   a.click();
                   a.remove();
                   URL.revokeObjectURL(url);
                 };

                 progressDiv.innerHTML +=
                   '<div class="alert alert-success mt-2">Fertig – überprüfe die Ergebnisse!</div>';
                 generateBtn.style.display = 'block';   // wieder anzeigen
                 break;
             }
           });
      }
    } catch (err) {
      progressDiv.innerHTML =
        `<div class="alert alert-danger">Netzwerkfehler: ${err.message}</div>`;
      generateBtn.style.display = 'block';
    }
  });
});