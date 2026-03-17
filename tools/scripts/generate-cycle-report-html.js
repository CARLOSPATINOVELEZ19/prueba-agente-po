#!/usr/bin/env node
/**
 * Genera reporte HTML gerencial de análisis de ciclo de desarrollo
 * Lee JSON de Jira y produce docs/analisis-ciclo-desarrollo.html
 */

const fs = require('fs');
const path = require('path');

const JIRA_BASE = 'https://jirasegurosbolivar.atlassian.net/browse';

const PHASES = [
  { id: 'customfield_24759', label: 'Por Hacer (Backlog)' },
  { id: 'customfield_24764', label: 'En Progreso (Desarrollo)' },
  { id: 'customfield_24765', label: 'Pruebas QA' },
  { id: 'customfield_24767', label: 'Pruebas UAT' },
  { id: 'customfield_24757', label: 'Pendiente PAP (esperando deploy)' },
  { id: 'customfield_24762', label: 'Producción' },
  { id: 'customfield_24748', label: 'Ciclo total (Por hacer → Producción)' },
];

function formatHours(h) {
  if (h == null || (typeof h === 'number' && isNaN(h))) return '—';
  const n = Number(h);
  if (n === 0) return '0 h';
  if (n >= 24) {
    const days = Math.floor(n / 24);
    const rest = (n % 24).toFixed(1);
    return rest > 0 ? `${days}d ${rest}h` : `${days}d`;
  }
  return `${n.toFixed(1)} h`;
}

function analyze(data) {
  const issues = data.issues || [];
  const stats = {};
  for (const p of PHASES) {
    const vals = issues
      .map((i) => i.fields?.[p.id])
      .filter((v) => v != null && typeof v === 'number' && !isNaN(v) && v >= 0);
    const sum = vals.reduce((a, b) => a + b, 0);
    stats[p.id] = {
      avg: vals.length ? sum / vals.length : 0,
      count: vals.length,
    };
  }
  return { issues, stats };
}

function escapeHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function generateHtml(dataPath, outPath) {
  const raw = fs.readFileSync(dataPath, 'utf8');
  const data = JSON.parse(raw);
  const { issues, stats } = analyze(data);

  const phaseCards = PHASES.map(
    (p) => `
    <div class="phase-card">
      <div class="phase-label">${escapeHtml(p.label)}</div>
      <div class="phase-value">${formatHours(stats[p.id].avg)}</div>
      <div class="phase-meta">promedio · ${stats[p.id].count} HUs</div>
    </div>`
  ).join('');

  const tableRows = issues
    .map((issue) => {
      const f = issue.fields || {};
      const key = issue.key;
      const summary = escapeHtml(f.summary || '');
      const project = f.project?.key || '—';
      const issuetype = f.issuetype?.name || '—';
      const link = `${JIRA_BASE}/${key}`;
      const cells = PHASES.map(
        (p) => `<td class="num">${formatHours(f[p.id])}</td>`
      ).join('');
      return `
      <tr>
        <td><a href="${link}" target="_blank" rel="noopener">${escapeHtml(key)}</a></td>
        <td>${escapeHtml(summary)}</td>
        <td><span class="badge">${escapeHtml(issuetype)}</span></td>
        <td>${escapeHtml(project)}</td>
        ${cells}
      </tr>`;
    })
    .join('');

  const phaseHeaders = PHASES.map((p) => `<th>${escapeHtml(p.label)}</th>`).join('');

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Análisis Ciclo de Desarrollo | Reporte Gerencial | prueba-agente-po</title>
  <meta name="description" content="Análisis de tiempo por fase del ciclo de desarrollo. 100 HUs cerradas (1 ene - 30 mar 2025). Seguros Bolívar.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-primary: #0f1419;
      --bg-secondary: #1a2332;
      --bg-card: #1e2a3a;
      --accent: #00d4aa;
      --accent-muted: #00a884;
      --text-primary: #e8edf4;
      --text-secondary: #8b9cb3;
      --border: #2d3d52;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'DM Sans', -apple-system, sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      line-height: 1.6;
      min-height: 100vh;
    }
    .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    .nav-link {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      color: var(--accent);
      text-decoration: none;
      font-size: 0.9rem;
      transition: opacity 0.2s;
    }
    .nav-link:hover { opacity: 0.85; }
    header {
      margin-bottom: 2rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid var(--border);
    }
    .report-title { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem; }
    .report-subtitle { color: var(--text-secondary); font-size: 1rem; }
    .report-meta {
      display: inline-block;
      margin-top: 1rem;
      padding: 0.35rem 0.85rem;
      background: var(--bg-card);
      border-radius: 6px;
      font-size: 0.85rem;
      color: var(--accent);
      font-family: 'JetBrains Mono', monospace;
    }
    .section { margin-bottom: 2.5rem; }
    .section-title {
      font-size: 1.15rem;
      font-weight: 600;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .section-title::before {
      content: '';
      width: 4px;
      height: 1.2em;
      background: linear-gradient(180deg, var(--accent), var(--accent-muted));
      border-radius: 2px;
    }
    .summary-box {
      background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 2rem;
    }
    .summary-box h3 { font-size: 1.05rem; margin-bottom: 0.75rem; }
    .summary-box p { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.75; }
    .phases-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .phase-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.25rem;
      transition: border-color 0.2s;
    }
    .phase-card:hover { border-color: var(--accent-muted); }
    .phase-label { font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem; }
    .phase-value { font-size: 1.25rem; font-weight: 600; color: var(--accent); font-family: 'JetBrains Mono', monospace; }
    .phase-meta { font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.35rem; }
    .table-wrapper {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow-x: auto;
    }
    table { width: 100%; border-collapse: collapse; min-width: 900px; }
    th {
      text-align: left;
      padding: 0.85rem 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      color: var(--text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: var(--bg-secondary);
      border-bottom: 1px solid var(--border);
      white-space: nowrap;
    }
    td {
      padding: 0.85rem 1rem;
      font-size: 0.9rem;
      border-bottom: 1px solid var(--border);
    }
    tr:last-child td { border-bottom: none; }
    tr:hover td { background: rgba(0, 212, 170, 0.04); }
    td.num { font-family: 'JetBrains Mono', monospace; font-size: 0.85rem; color: var(--text-secondary); }
    a { color: var(--accent); text-decoration: none; }
    a:hover { text-decoration: underline; }
    .badge {
      display: inline-block;
      padding: 0.2rem 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      border-radius: 4px;
      background: rgba(0, 212, 170, 0.15);
      color: var(--accent);
    }
    .footer {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border);
      font-size: 0.85rem;
      color: var(--text-secondary);
      text-align: center;
    }
    .footer a { color: var(--accent); }
    @media (max-width: 768px) {
      .container { padding: 1rem; }
      .phases-grid { grid-template-columns: repeat(2, 1fr); }
    }
  </style>
</head>
<body>
  <div class="container">
    <a href="reportes.html" class="nav-link">← Ver todos los reportes</a>
    <a href="index.html" class="nav-link" style="margin-left: 1rem;">Inicio →</a>

    <header>
      <h1 class="report-title">Análisis de Tiempo por Fase del Ciclo de Desarrollo</h1>
      <p class="report-subtitle">Reporte gerencial · 100 Historias de Usuario cerradas · 7 proyectos</p>
      <span class="report-meta">1 enero – 30 marzo 2025 · Jira Seguros Bolívar</span>
    </header>

    <section class="section">
      <div class="summary-box">
        <h3>Resumen ejecutivo</h3>
        <p>
          Análisis de <strong>100 HUs cerradas</strong> en el rango 1 de enero a 30 de marzo de 2025,
          de <strong>7 proyectos distintos</strong>. Los datos provienen de los campos de tiempo del workflow de Jira.
          El <strong>ciclo total promedio</strong> (Por hacer → Producción) es de <strong>${formatHours(stats.customfield_24748.avg)}</strong>.
          La fase con mayor tiempo promedio es <strong>En Progreso (Desarrollo)</strong> con ${formatHours(stats.customfield_24764.avg)}.
        </p>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Promedio de horas por fase</h2>
      <div class="phases-grid">
        ${phaseCards}
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">Detalle por incidencia</h2>
      <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">
        Haz clic en la clave de la incidencia para abrirla en Jira.
      </p>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Incidencia</th>
              <th>Resumen</th>
              <th>Tipo</th>
              <th>Proyecto</th>
              ${phaseHeaders}
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
      </div>
    </section>

    <footer class="footer">
      <p>Reporte generado el ${new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      <p style="margin-top: 0.5rem;">Ecosistema Ciencuadras · Seguros Bolívar</p>
      <p style="margin-top: 1rem;"><a href="reportes.html">Ver todos los reportes</a></p>
    </footer>
  </div>
</body>
</html>`;

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  console.log('Reporte generado:', outPath);
}

const dataPath =
  process.argv[2] || path.join(__dirname, '../../docs/data/jira-cycle-2025.json');
const outPath = path.join(__dirname, '../../docs/analisis-ciclo-desarrollo.html');

if (!fs.existsSync(dataPath)) {
  console.error('No se encontró el archivo de datos. Uso: node generate-cycle-report-html.js <ruta-json>');
  process.exit(1);
}

generateHtml(dataPath, outPath);
