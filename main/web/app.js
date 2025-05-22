// Frontend-Logik für Streaming-Progress & Download (ohne Prozenttext)

document.addEventListener('DOMContentLoaded', () => {
  const form        = document.getElementById('uploadForm');
  const pdfInput    = document.getElementById('pdfFile');
  const instrInput  = document.getElementById('instructions');
  const apiKeyInput = document.getElementById('apiKey');
  const progressDiv = document.getElementById('progress');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validierung ----------------------------------------------------------
    const file   = pdfInput.files[0];
    const apiKey = apiKeyInput.value.trim();
    if (!file || !apiKey) {
      progressDiv.innerHTML =
        '<div class="alert alert-warning">PDF & API-Key erforderlich.</div>';
      return;
    }

    // Balken sofort bei 0 % anzeigen ---------------------------------------
    progressDiv.innerHTML = `
      <div class="progress">
        <div id="progressBar"
             class="progress-bar progress-bar-striped progress-bar-animated"
             role="progressbar" style="width:0%;"></div>
      </div>`;
    const bar = document.getElementById('progressBar');

    // Streaming-Request ----------------------------------------------------
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
        return;
      }

      const reader = resp.body.getReader();
      const dec    = new TextDecoder();
      const esc    = (t) => `"${String(t).replace(/"/g, '""')}"`;
      const csv    = [];

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        dec.decode(value, { stream: true })
           .split('\n')
           .filter(Boolean)
           .forEach(line => {
             const d = JSON.parse(line);

             switch (d.type) {
               case 'progress':
                 bar.style.width = `${d.percent}%`;
                 break;

               case 'card':
                 csv.push([esc(d.question), esc(d.answer)].join(';'));
                 break;

               case 'error':
                 progressDiv.innerHTML =
                   `<div class="alert alert-danger">${d.message}</div>`;
                 break;

               case 'done':
                 bar.style.width = '100%';

                 // CSV-Download
                 const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
                 const url  = URL.createObjectURL(blob);
                 const a    = document.createElement('a');
                 a.href = url;
                 a.download = file.name.replace(/\.pdf$/i, '.csv');
                 document.body.appendChild(a);
                 a.click();
                 a.remove();
                 URL.revokeObjectURL(url);

                 progressDiv.innerHTML +=
                   '<div class="alert alert-success mt-2">CSV heruntergeladen.</div>';
                 break;
             }
           });
      }
    } catch (err) {
      progressDiv.innerHTML =
        `<div class="alert alert-danger">Netzwerkfehler: ${err.message}</div>`;
    }
  });
});