# Workspace: resultados del trabajo de agentes

Workspace almacena los resultados del trabajo de cada agente (scripts, tests, agentes IA). Esta carpeta está en `.gitignore` para mantener la separación estricta entre código fuente y artefactos generados.

## Diagrama: flujo de datos y generadores

```mermaid
flowchart TB
    subgraph workspace ["Workspace (resultados de agentes - .gitignore)"]
        config[config/ platforms.json]
        reports[reports/]
        audit[audit/]
        playwright[playwright/]
        plans[plans/]
        observabilidad[observabilidad/]
        repos[repos/]
        data[data/]
    end

    subgraph generators ["Generadores"]
        G1[generate-cycle-report-html.js]
        G2[analyze-cycle-time.js]
        G3[audit-console-errors.js]
        G4[Playwright]
        G5[Agentes IA]
    end

    subgraph input ["Entrada"]
        I1[docs/data/jira-cycle-*.json]
        I2[platforms.json]
    end

    I1 --> G1
    I1 --> G2
    I2 --> G3
    I2 --> G4

    G1 --> reports
    G2 --> reports
    G3 --> audit
    G4 --> playwright
    G5 --> plans
    G5 --> observabilidad

    reports --> deploy[deploy-pages.js]
    deploy --> docs[docs/*.html GitHub Pages]
```

> **[Abrir en Draw.io](../diagrams/flujo-workspace.html)** — Editar diagrama en la aplicación

## Estructura

```
Workspace/
├── config/         # Configuración por plataforma (URLs, Jira, Datadog)
│   └── platforms.json   # Creado en onboarding; plantilla en docs/templates/
├── reports/        # Reportes HTML y MD (análisis ciclo, auditoría, etc.)
├── audit/          # Auditoría de consola (JSON, screenshots)
├── observabilidad/ # Documentación de observabilidad (runbooks, mapeos)
├── repos/          # Repos externos clonados de la plataforma
├── playwright/     # test-results, playwright-report
├── plans/          # Planes generados por agentes
└── data/           # Datos exportados (opcional)
```

## Configuración de plataformas

`Workspace/config/platforms.json` contiene la configuración específica por producto:

- **URLs**: app, staging, docs
- **smokePaths**: rutas para tests E2E (`tests/smoke.spec.js`)
- **auditZones**: zonas para auditoría de consola (name, url)
- **Jira**: projectKey, projectUrl, tablero de incidentes, tablero de incidentes de seguridad
- **Datadog**: site, dashboardIds, monitorTags

Se crea en la **primera interacción** siguiendo `docs/onboarding/01-flujo-primera-interaccion.md`. Plantilla: `docs/templates/platforms.example.json`.

## Subcarpetas

| Carpeta | Generador | Contenido |
|---------|-----------|-----------|
| `reports/` | `tools/scripts/generate-cycle-report-html.js`, `tools/scripts/analyze-cycle-time.js` | `analisis-ciclo-desarrollo.html`, `analisis-ciclo-desarrollo.md` |
| `audit/` | `scripts/audit-console-errors.js` | `console-audit-report.json`, `screenshots/` |
| `playwright/` | Playwright | `test-results/`, `playwright-report/` |
| `plans/` | Agentes IA (Cursor) | Planes generados por el orquestador |
| `observabilidad/` | Análisis Datadog | Runbooks, mapeo servicio↔repo |
| `repos/` | Clonación manual | Repos externos de la plataforma |
| `data/` | Opcional | Datos exportados |

## Publicación en GitHub Pages

Los reportes HTML en `Workspace/reports/` no se publican automáticamente porque `Workspace/` está en `.gitignore`. Para publicar:

```bash
npm run deploy:pages
```

Este comando regenera los reportes y los copia a `docs/` para que GitHub Pages los sirva. Luego hacer commit y push.

## Datos de entrada

Los scripts de reportes leen datos de `docs/data/` (ej. `jira-cycle-2025.json`). Esos archivos son datos de referencia versionados y no se consideran artefactos.

## Screenshots de auditoría

Las capturas de auditoría están en `Workspace/audit/screenshots/`. Al ejecutar `npm run deploy:pages`, se copian a `docs/screenshots-auditoria/` para publicación en GitHub Pages.
