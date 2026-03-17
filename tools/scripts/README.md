# Scripts de automatización

Scripts reutilizables para el proyecto.

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `generate-cycle-report-html.js` | Genera reporte HTML del ciclo de desarrollo |
| `deploy-pages.js` | Regenera reportes y copia a `docs/` para GitHub Pages |

## Uso

### Reporte de ciclo

```bash
npm run report:cycle
```

Genera el reporte en `Workspace/reports/`.

### Desplegar a GitHub Pages

```bash
npm run deploy:pages
```

Regenera los reportes y los copia a `docs/` para que GitHub Pages los sirva.
