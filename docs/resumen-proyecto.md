# Resumen del Proyecto: prueba-agente-po

> **Archivo de contexto principal** para que la IA entienda el proyecto, sus patrones y reglas de comportamiento.

---

## ¿De qué trata la aplicación?

**prueba-agente-po** es un workspace **agnóstico** de pruebas E2E y auditoría para cualquier plataforma/aplicación web.

Incluye:

- **Tests E2E** con Playwright (baseURL configurable)
- **Scripts de auditoría** de errores de consola en el navegador
- **Reportes** de ciclo de desarrollo y despliegue a GitHub Pages
- **Integración** con Jira, Datadog y GitHub vía MCP

**Configuración por plataforma** (URLs, Jira, Datadog) vive en `Workspace/config/platforms.json`. Ver `docs/onboarding/01-flujo-primera-interaccion.md` para el flujo de primera interacción.

---

## Stack tecnológico (versiones)

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Node.js | 18+ | Runtime |
| Playwright | ^1.58.2 | Tests E2E y auditoría de consola |
| Vitest | ^4.1.0 | Tests unitarios (audit-data, helpers) |
| ESLint | ^8.57.0 | Linting |
| Prettier | ^3.3.0 | Formateo |
| supertest | ^7.2.2 | Tests de API (disponible, no usado aún) |

---

## Patrones de componentes

### Tests

- **Playwright**: `tests/smoke.spec.js` — smoke tests E2E agnósticos (baseURL y rutas desde `Workspace/config/platforms.json`)
- **Vitest**: `tests/unit/` — tests unitarios (audit-data, helpers)

### Scripts

- **audit-console-errors.js** — auditoría de errores de consola (URL y zonas desde config)
- **get-platform-config.js** — lee `Workspace/config/platforms.json`; usado por Playwright, audit y otros scripts
- **audit-data.js** — datos y helpers para auditoría (ZONES por defecto, createEmptyReport, categorizeMessage)

---

## Reglas (Rules)

Comportamientos que la IA **debe seguir** al trabajar en este proyecto:

1. **No hagas build en cada cambio**  
   No ejecutes `npm run build` o equivalentes tras cada modificación. Solo haz build cuando sea explícitamente necesario (ej. antes de deploy).

2. **Planificación antes de código**  
   Para tareas complejas, genera un plan en `Workspace/plans/` antes de tocar código.

3. **Validación con Playwright**  
   No consideres una tarea terminada sin un reporte de éxito de Playwright cuando aplique.

4. **Uso de MCP**  
   Para Jira: MCP `atlassian`. Para Datadog: MCP `datadog`. Para diagramas: MCP `drawio-mcp`. Para análisis de PRs: `gh pr list`.

5. **No mezclar contextos**  
   Si la tarea es compleja, indica que abrirás un Subagente en lugar de mezclar contextos.

6. **Spec Driven Development (SDD)**  
   La especificación es la fuente de verdad. Antes de implementar: (1) Define requisitos y criterios de aceptación, (2) Genera diseño técnico y plan en `Workspace/plans/`, (3) Descompón en tareas atómicas. El código se deriva de la spec; usa PRD/Confluence como input cuando aplique.

### Framework de trabajo

**Spec Driven Development (SDD)** es el framework de trabajo del proyecto. La especificación formal (PRD, Confluence, Jira) es la fuente de verdad; el código se deriva de ella. Referencias: `rules/process-prd-generation.mdc` (formato PRD) y `rules/AGENTS.md` (ciclo Problem/Design/Deliver).

---

## Estructura de carpetas relevante

Separación estricta entre **código fuente** (versionado) y **artefactos generados** (`.gitignore`). Ver [docs/ESTRUCTURA.md](./ESTRUCTURA.md) para el árbol completo, flujos de lógica y **diagramas Mermaid** integrados.

> **Diagramas:** La documentación incluye diagramas gráficos (Mermaid) en ESTRUCTURA, onboarding, architecture y runbooks. Ver [docs/diagrams/README.md](./diagrams/README.md) para la estrategia y edición en Draw.io.

```
prueba-agente-po/
├── tests/
│   ├── smoke.spec.js       # E2E agnósticos (baseURL y smokePaths desde config)
│   └── unit/               # Tests unitarios (Vitest)
├── scripts/
│   ├── audit-console-errors.js
│   ├── get-platform-config.js
│   └── audit-data.js
├── tools/scripts/
│   ├── generate-cycle-report-html.js
│   ├── analyze-cycle-time.js
│   ├── deploy-pages.js
│   └── README.md
├── docs/                   # Documentación y reportes publicados
│   ├── README.md           # Índice de documentación
│   ├── resumen-proyecto.md # Contexto principal para IA
│   ├── ESTRUCTURA.md       # Estructura y lógica del proyecto
│   ├── Asset/              # Plantillas CSS y HTML para reportes (GitHub Pages)
│   ├── architecture/       # Diseño, stack, design-system, workspace
│   ├── onboarding/         # Flujo primera interacción
│   ├── runbook/            # Guías operativas
│   ├── analisis/           # Análisis y reportes MD (ciclo, limpieza)
│   ├── templates/          # Plantillas de config (platforms.example.json)
│   ├── data/               # Datos de referencia (jira-cycle-*.json)
│   └── decisions/          # ADRs
├── Workspace/              # Resultados del trabajo de agentes (no versionados)
│   ├── config/             # platforms.json (URLs, Jira, Datadog por plataforma)
│   ├── reports/            # HTML, MD de reportes
│   ├── audit/              # Auditoría consola (JSON, screenshots)
│   ├── playwright/         # test-results, playwright-report
│   ├── plans/              # Planes generados por agentes
│   ├── observabilidad/     # Runbooks Datadog, mapeos
│   ├── repos/              # Repos externos clonados
│   └── data/               # Datos exportados (opcional)
├── playwright.config.js    # baseURL desde get-platform-config
├── vitest.config.js        # Config Vitest (tests/unit/**/*.test.js)
├── .cursor/                # Reglas y skills de agentes (planes en Workspace/plans)
└── rules/                  # Reglas técnicas (Playwright, Datadog, PRD, etc.)
```

---

## Comandos principales

| Comando | Descripción |
|---------|-------------|
| `npm test` | Tests E2E Playwright (URL desde config) |
| `npm run test:unit` | Tests unitarios (Vitest) |
| `npm run test:ui` | Playwright con UI interactiva |
| `npm run audit` | Auditoría de errores de consola (URL desde config) |
| `npm run report:cycle` | Genera reporte ciclo de desarrollo → `Workspace/reports/` |
| `npm run deploy:pages` | Regenera reportes y copia a `docs/` para GitHub Pages |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
