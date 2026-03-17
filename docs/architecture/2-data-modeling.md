# Modelado de datos

## Enfoque: Event-Driven (sin base de datos)

El proyecto **no utiliza base de datos relacional**. El diseño de AgentCrew es **event-driven** y usa NATS como bus de mensajes.

> **Nota**: Los webhooks están implementados y responden HTTP; la publicación a NATS y el consumo por agents son stubs. Este documento describe el diseño objetivo.

## Estructura de un Job (mensaje NATS — diseño)

Cada mensaje publicado en el subject `agentcrew.jobs` tendría la siguiente estructura:

```json
{
  "trigger": "schedule" | "webhook",
  "jobId": "string",
  "type": "string",
  "provider": "claude" | "opencode",
  "payload": {},
  "timestamp": "ISO8601"
}
```

### Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| trigger | string | Origen: `schedule` (cron) o `webhook` (HTTP) |
| jobId | string | Identificador único del job |
| type | string | Tipo de job (ej. `daily-report`, `health-check`) |
| provider | string | Agente que debe procesar: `claude` o `opencode` |
| payload | object | Datos adicionales (extensible) |
| timestamp | string | Fecha/hora en ISO 8601 |

## Jobs predefinidos (diseño — schedules no implementados)

| jobId | Cron | type | provider |
|-------|------|------|----------|
| daily-report | 0 9 * * * (9:00 AM) | daily-report | claude |
| health-check | */5 * * * * (cada 5 min) | health-check | opencode |

## Scripts de prueba (implementados)

`tools/scripts/seed-webhook-jobs.js` inyecta jobs de ejemplo vía POST al webhook (definidos en `tools/scripts/seed-jobs.js`):

| jobId | provider | type | Uso |
|-------|----------|------|-----|
| seed-daily-report | claude | daily-report | Reporte diario |
| seed-health-check | opencode | health-check | Health check |
| seed-custom | claude | - | Job custom |

`tools/scripts/trigger-webhook-cli.js` permite disparar webhooks manualmente desde la terminal.

Requiere API AgentCrew en ejecución (`cd portal/server && npm start`).

## Extensibilidad (cuando se implemente)

Para añadir nuevos tipos de jobs:

1. Definir el job en `triggers/schedules.js` (si es programado) o invocar `POST /webhook/:jobId` (si es disparado por webhook)
2. Añadir filtro en el agente correspondiente (`agents/*.js`)
3. Opcionalmente, añadir post-action en `post-actions/`
