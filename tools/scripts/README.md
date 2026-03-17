# Scripts de automatización

Scripts reutilizables para el proyecto.

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `generate-cycle-report-html.js` | Genera reporte HTML del ciclo de desarrollo |
| `analyze-cycle-time.js` | Analiza tiempo por fase del ciclo (Jira); genera MD en `Workspace/reports/` |
| `deploy-pages.js` | Regenera reportes y copia a `docs/` para GitHub Pages |

## Uso

### Reporte de ciclo

```bash
npm run report:cycle
```

Genera el reporte HTML en `Workspace/reports/analisis-ciclo-desarrollo.html`. Lee datos de `docs/data/jira-cycle-2025.json`.

### Análisis de tiempo por fase

```bash
node tools/scripts/analyze-cycle-time.js [ruta-json]
```

Analiza HUs de Jira y genera `Workspace/reports/analisis-ciclo-desarrollo.md`. Por defecto usa `docs/data/jira-cycle-2025.json`.

### Desplegar a GitHub Pages

```bash
npm run deploy:pages
```

Regenera los reportes y los copia a `docs/` para que GitHub Pages los sirva.
