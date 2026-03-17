# Resumen del Proyecto: prueba-agente-po

> **Archivo de contexto principal** para que la IA entienda el proyecto, sus patrones y reglas de comportamiento.

---

## ¿De qué trata la aplicación?

**prueba-agente-po** es un workspace dual que combina:

1. **AgentCrew (Portal)**  
   API orquestadora de agentes IA con triggers (Schedules + Webhooks), bus de mensajes NATS, y post-actions (Slack, APIs externas). Permite ejecutar jobs programados o disparados por webhooks, procesados por agentes (Claude, OpenCode) y notificados vía Slack u otras integraciones.

2. **Ecosistema Ciencuadras**  
   Workspace de pruebas E2E con Playwright y scripts de auditoría para el portal inmobiliario ciencuadras.com (Seguros Bolívar).

---

## Stack tecnológico (versiones)

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Node.js | 18+ | Runtime |
| Express | ^4.21.0 | API REST (portal/server) |
| NATS | ^2.28.2 | Message bus Pub/Sub |
| node-cron | ^3.0.3 | Schedules (cron) |
| axios | ^1.7.7 | HTTP client (Slack, APIs) |
| Playwright | ^1.58.2 | Tests E2E y auditoría |
| ESLint | ^8.57.0 | Linting |
| Prettier | ^3.3.0 | Formateo |
| Docker | - | NATS (docker compose) |

---

## Patrones de componentes

### Portal (AgentCrew)

> **Estado actual**: El servidor arranca. Webhooks operativos; NATS, schedules y agents son stubs.

- **Punto de entrada**: `portal/server/index.js` — bootstrap con NATS, schedules, agents
- **App**: `portal/server/app.js` — Express, health, info, registro de webhooks
- **Implementado**: `triggers/webhooks.js` (POST /webhook, POST /webhook/:jobId)
- **Stubs**: `triggers/schedules.js`, `config/nats.js`, `agents/claude-provider.js`, `agents/opencode-provider.js`

### Tests

- **Playwright**: `tests/ciencuadras.spec.js` — smoke tests E2E contra ciencuadras.com (baseURL en playwright.config.js)
- **Scripts**: `scripts/audit-console-errors.js` — auditoría de errores de consola en ciencuadras.com

---

## Modelos de datos

No hay base de datos relacional. El sistema es **event-driven**:

| Concepto | Descripción |
|----------|-------------|
| **Job** | Mensaje en NATS con: `jobId`, `trigger`, `provider`, `type`, `payload`, `timestamp` |
| **Schedule** | Job programado por cron (ej. `daily-report`, `health-check`) |
| **Webhook** | Job disparado por POST HTTP con `jobId` en path o body |

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
├── portal/                 # Código fuente
│   ├── server/             # AgentCrew API
│   └── README.md
├── tests/
│   ├── ciencuadras.spec.js # E2E contra ciencuadras.com
│   └── unit/               # Tests unitarios (Vitest)
├── scripts/
│   └── audit-console-errors.js
├── tools/scripts/
│   ├── seed-webhook-jobs.js
│   ├── trigger-webhook-cli.js
│   ├── generate-cycle-report-html.js
│   ├── deploy-pages.js
│   └── README.md
├── docs/                   # Documentación y reportes publicados
│   ├── resumen-proyecto.md # Contexto principal para IA
│   └── architecture/       # Diseño del sistema
├── Workspace/              # Resultados del trabajo de agentes (no versionados)
│   ├── reports/            # HTML, MD de reportes
│   ├── audit/              # Auditoría consola (JSON, screenshots)
│   ├── playwright/         # test-results, playwright-report
│   ├── plans/              # Planes generados por agentes
│   └── data/               # Datos exportados (opcional)
├── playwright.config.js    # baseURL: ciencuadras.com
└── .cursor/                # Reglas y skills de agentes (planes en Workspace/plans)
```

---

## Comandos principales

| Comando | Descripción |
|---------|-------------|
| `npm test` | Tests E2E Playwright (ciencuadras.com) |
| `npm run test:unit` | Tests unitarios (Vitest) |
| `npm run test:ui` | Playwright con UI interactiva |
| `npm run audit` | Auditoría de errores de consola (ciencuadras.com) |
| `npm run report:cycle` | Genera reporte ciclo de desarrollo → `Workspace/reports/` |
| `npm run deploy:pages` | Regenera reportes y copia a `docs/` para GitHub Pages |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

**Portal (manual)**: `cd portal/server && npm start` — arranca en http://localhost:3003; NATS opcional (stub si no está disponible).
