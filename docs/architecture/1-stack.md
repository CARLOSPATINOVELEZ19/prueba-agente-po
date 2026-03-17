# Stack Tecnológico

## Runtime y lenguaje

| Tecnología | Versión | Notas |
|------------|---------|-------|
| Node.js | 18+ | Requerido para ES modules |
| JavaScript (ESM) | - | `"type": "module"` en portal/server |
| JavaScript (CJS) | - | Raíz: `"type": "commonjs"` (tests, scripts) |

## Backend (Portal AgentCrew)

| Dependencia | Versión | Uso |
|-------------|---------|-----|
| express | ^4.21.0 | API REST |
| nats | ^2.28.2 | Message bus Pub/Sub |
| node-cron | ^3.0.3 | Schedules (cron) |
| axios | ^1.7.7 | HTTP client (Slack, APIs externas) |

> Las dependencias están en `portal/server/package.json`. El servidor arranca; NATS, schedules y agents son stubs que permiten el bootstrap.

## Testing y calidad

| Herramienta | Versión | Uso |
|-------------|---------|-----|
| @playwright/test | ^1.58.2 | Tests E2E (raíz) |
| vitest | ^4.1.0 | Tests unitarios |
| eslint | ^8.57.0 | Linting |
| eslint-config-prettier | ^9.1.0 | Integración Prettier |
| prettier | ^3.3.0 | Formateo |

## Infraestructura

| Herramienta | Uso |
|-------------|-----|
| Docker | NATS (documentado en runbooks; no hay docker-compose en el repo) |
| Playwright | Navegadores para E2E y auditoría |

## Variables de entorno (portal/server)

| Variable | Descripción | Default |
|----------|-------------|---------|
| PORT | Puerto de la API | 3003 |
| NATS_URL | URL de NATS | nats://localhost:4222 |
| SLACK_BOT_TOKEN | Token de Slack (opcional) | - |
| SLACK_CHANNEL | Canal de Slack | #agentcrew |
| POST_ACTION_URL | URL para post-actions custom | - |
