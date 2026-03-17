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
| Playwright | ^1.58.2 | Tests E2E y auditoría |
| Vitest | ^4.1.0 | Tests unitarios |
| ESLint | ^8.57.0 | Linting |
| Prettier | ^3.3.0 | Formateo |

---

## Patrones de componentes

### Tests

- **Playwright**: `tests/ciencuadras.spec.js` — smoke tests E2E (baseURL en playwright.config.js o `Workspace/config/platforms.json`)
- **Scripts**: `scripts/audit-console-errors.js` — auditoría de errores de consola en la URL configurada

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
   Para Jira: MCP `atlassian`. Para Datadog: MCP `datadog`. Para análisis de PRs: `gh pr list`.

5. **No mezclar contextos**  
   Si la tarea es compleja, indica que abrirás un Subagente en lugar de mezclar contextos.

---

## Estructura de carpetas relevante

Separación estricta entre **código fuente** (versionado) y **artefactos generados** (`.gitignore`):

```
prueba-agente-po/
├── tests/
│   ├── ciencuadras.spec.js # E2E (baseURL desde config)
│   └── unit/               # Tests unitarios (Vitest)
├── scripts/
│   └── audit-console-errors.js
├── tools/scripts/
│   ├── generate-cycle-report-html.js
│   ├── deploy-pages.js
│   └── README.md
├── docs/                   # Documentación y reportes publicados
│   ├── resumen-proyecto.md # Contexto principal para IA
│   ├── onboarding/         # Flujo primera interacción
│   ├── templates/          # Plantillas de config (platforms.example.json)
│   └── architecture/      # Diseño del sistema
├── Workspace/              # Resultados del trabajo de agentes (no versionados)
│   ├── config/             # platforms.json (URLs, Jira, Datadog por plataforma)
│   ├── reports/            # HTML, MD de reportes
│   ├── audit/              # Auditoría consola (JSON, screenshots)
│   ├── playwright/         # test-results, playwright-report
│   ├── plans/              # Planes generados por agentes
│   └── data/               # Datos exportados (opcional)
├── playwright.config.js    # baseURL (o desde Workspace/config)
└── .cursor/                # Reglas y skills de agentes (planes en Workspace/plans)
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
