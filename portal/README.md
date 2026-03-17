# AgentCrew - Orquestador de Agentes IA

Arquitectura basada en **Schedules**, **Webhooks**, **Post-Actions** y **MCP integrations**.

## Estado actual

El servidor (`server/index.js`) define el punto de entrada pero **importa módulos no implementados**:

- `triggers/schedules.js`, `triggers/webhooks.js`
- `config/nats.js`
- `agents/claude-provider.js`, `agents/opencode-provider.js`

El servidor **no arranca** hasta que existan esos archivos.

## Componentes (diseño)

| Componente | Descripción |
|------------|-------------|
| **Triggers** | Schedules (cron) + Webhooks (HTTP) |
| **Message Bus** | NATS Pub/Sub |
| **AI Agents** | Claude Code, OpenCode (providers) |
| **Post-Actions** | Slack, Teams, Any API |
| **MCP** | PostgreSQL, Slack MCP, GitLab, Kubernetes |

## Inicio (cuando esté implementado)

### 1. Levantar NATS

No hay `docker-compose.yml` en el repo. Opciones:

```bash
# macOS
brew install nats-server
nats-server
```

O crear un `docker-compose.yml` con la imagen `nats:2-alpine`.

### 2. Instalar e iniciar API

```bash
cd server
npm install
npm start
```

### 3. Probar Webhook

```bash
curl -X POST http://localhost:3003/webhook/daily-report \
  -H "Content-Type: application/json" \
  -d '{"provider":"claude","message":"test"}'
```

## Variables de Entorno

| Variable | Descripción | Default |
|----------|-------------|---------|
| `PORT` | Puerto de la API | 3003 |
| `NATS_URL` | URL de NATS | nats://localhost:4222 |
| `SLACK_BOT_TOKEN` | Token de Slack (opcional) | - |
| `SLACK_CHANNEL` | Canal de Slack | #agentcrew |
| `POST_ACTION_URL` | URL para post-actions custom | - |

## Endpoints (diseño)

- `GET /` - Info del servicio
- `GET /health` - Health check
- `POST /webhook` - Webhook genérico (body con jobId)
- `POST /webhook/:jobId` - Webhook con jobId en path

## Schedules (diseño)

- `daily-report`: 9:00 AM diario → Claude
- `health-check`: Cada 5 minutos → OpenCode
