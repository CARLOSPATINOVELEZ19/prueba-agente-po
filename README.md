# prueba-agente-po

Workspace **agnóstico** de pruebas E2E, auditoría y automatización para cualquier aplicación web. La URL de la app, rutas de smoke, zonas de auditoría y metadatos de Jira/Datadog/GitHub se definen en `Workspace/ciencuadras/config/platforms.json` por defecto (u otro `WORKSPACE_ROOT`; ver [docs/architecture/4-workspace.md](./docs/architecture/4-workspace.md); onboarding en [docs/onboarding/01-flujo-primera-interaccion.md](./docs/onboarding/01-flujo-primera-interaccion.md)).

## Estructura

```
prueba-agente-po/
├── tests/                    # E2E Playwright (smoke, miniverse, reportes) + unit/ (Vitest)
├── scripts/                  # get-platform-config, auditoría consola, Lighthouse, demo agentes
├── tools/scripts/            # Reportes ciclo, deploy Pages, automation Cursor, diagramas HTML
├── miniverse/                # Mundo de píxeles para agentes (Vite + API; ver docs/architecture/1-stack.md)
├── docs/                     # Documentación viva e índices para GitHub Pages
├── Workspace/                # ciencuadras/ y jelpit-conjuntos-pagos/ (artefactos; .gitignore)
└── .cursor/                  # Reglas y skills de agentes (planes en Workspace/**/plans/)
```

## Comandos

| Comando | Descripción |
|---------|-------------|
| `npm test` | Tests E2E Playwright (proyecto `chromium`: smoke + reportes; URL base desde config) |
| `npx playwright test --project=miniverse` | E2E Miniverse (requiere `cd miniverse && npm run dev`) |
| `npm run test:ui` | Playwright con UI interactiva |
| `npm run test:unit` | Vitest (tests en `tests/unit/`) |
| `npm run audit` | Auditoría de errores de consola (zonas desde `platforms.json`) |
| `npm run audit:lighthouse` | Auditoría de rendimiento (PageSpeed API o Lighthouse CLI; salida en `Workspace/audit/lighthouse/`) |
| `npm run report:cycle` | Genera reporte HTML de ciclo → `Workspace/reports/` |
| `npm run deploy:pages` | Regenera reportes y copia a `docs/` para GitHub Pages |
| `npm run automation:create-cursor` | Asiste creación de automation Datadog→Cursor (ver runbook) |
| `npm run diagrams:regenerate-html` | Regenera `docs/diagrams/*.html` desde los `.mmd` |
| `npm run demo:agentes` | Ejecuta demo de agentes; `npm run demo:agentes:open` abre `docs/demo-agentes.html` |
| `npm run lint` / `npm run format` | ESLint / Prettier |

Detalle: [docs/resumen-proyecto.md](./docs/resumen-proyecto.md), [docs/architecture](./docs/architecture/).

## Requisitos

- Node.js 18+
- `npm install` en la raíz; en Miniverse, `npm install` dentro de `miniverse/` si trabajas ahí
- `npx playwright install` (primera vez, navegadores)

## Integraciones habituales

- **Jira / Confluence:** MCP Atlassian (cuando esté configurado)
- **Datadog:** MCP Datadog
- **GitHub:** MCP GitHub y/o CLI `gh`
- **Tests:** Playwright Test (CLI); Playwright MCP en Cursor es opcional ([docs/onboarding/02-playwright-mcp-config.md](./docs/onboarding/02-playwright-mcp-config.md))
