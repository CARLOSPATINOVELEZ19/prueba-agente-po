# Rutas y APIs

## AgentCrew API (portal/server)

> **Estado**: Las rutas están implementadas en `app.js` y `triggers/webhooks.js`. El servidor arranca; NATS, agents y post-actions son stubs.

Base URL: `http://localhost:3003` (o variable `PORT`)

### Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Info del servicio (nombre, versión, endpoints) |
| GET | `/health` | Health check (ok, service, timestamp) |
| POST | `/webhook` | Webhook genérico. Body: `{ jobId?, ...payload }` |
| POST | `/webhook/:jobId` | Webhook con jobId en path. Body: payload opcional |

### Respuestas (diseño)

#### GET /health

```json
{
  "ok": true,
  "service": "agentcrew-api",
  "timestamp": "2026-03-16T12:00:00.000Z"
}
```

#### POST /webhook/:jobId

**Request:**
```json
{
  "provider": "claude",
  "message": "test"
}
```

**Response 200 (éxito):**
```json
{
  "ok": true,
  "jobId": "test-job",
  "payload": { "provider": "claude", "message": "test", "jobId": "test-job" }
}
```

### Ejemplo cURL

```bash
curl -X POST http://localhost:3003/webhook/daily-report \
  -H "Content-Type: application/json" \
  -d '{"provider":"claude","message":"test"}'
```

## Tests E2E (Playwright)

Los tests actuales están en `tests/ciencuadras.spec.js` y usan `baseURL: https://www.ciencuadras.com` (definido en `playwright.config.js`). No consumen la API AgentCrew.

No existe `tests/agentcrew.spec.js` en el código actual.
