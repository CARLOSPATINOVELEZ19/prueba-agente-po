# prueba-agente-po

Workspace de pruebas E2E y auditoría para el ecosistema Ciencuadras (Seguros Bolívar).

## Estructura

```
prueba-agente-po/
├── tests/                    # Tests E2E con Playwright
├── scripts/                  # Scripts de auditoría y utilidades
│   └── audit-console-errors.js
├── tools/scripts/            # Scripts de automatización
│   ├── generate-cycle-report-html.js
│   └── deploy-pages.js
├── docs/                     # Documentación viva
│   ├── resumen-proyecto.md   # Contexto principal para IA
│   ├── architecture/         # Diseño del sistema
│   ├── decisions/            # ADRs (decisiones técnicas)
│   ├── runbook/              # Guías operativas
│   └── design-system.md     # Guía visual frontend
├── Workspace/                # Resultados de agentes (no versionado)
│   ├── reports/              # Reportes HTML/MD
│   ├── audit/                # Auditoría consola (JSON, screenshots)
│   ├── playwright/          # test-results, playwright-report
│   └── plans/                # Planes generados por agentes
└── .cursor/
    ├── rules/                # Reglas del orquestador
    └── skills/               # Skills reutilizables (prueba, construir)
```

## Comandos

| Comando            | Descripción                                        |
| ------------------ | -------------------------------------------------- |
| `npm test`         | Ejecuta tests E2E con Playwright (ciencuadras.com) |
| `npm run test:ui`  | Playwright con UI interactiva                      |
| `npm run audit`    | Auditoría de errores de consola en ciencuadras.com |
| `npm run lint`     | Ejecuta ESLint                                     |
| `npm run format`   | Formatea código con Prettier                        |

Ver [docs/resumen-proyecto.md](./docs/resumen-proyecto.md) y [docs/architecture](./docs/architecture/) para más detalles.

## Requisitos

- Node.js 18+
- `npm install`
- `npx playwright install` (primera vez, para descargar navegadores)

## Ecosistema

- **Gestión:** Jira (MCP atlassian)
- **Monitoreo:** Datadog (MCP datadog)
- **Tests:** Playwright para E2E
