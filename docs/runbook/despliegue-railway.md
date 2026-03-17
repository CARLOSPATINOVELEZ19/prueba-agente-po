# Runbook: Despliegue en Railway

> **Nota**: Este runbook es un template. El servidor `portal/server` requiere implementar los módulos `triggers/`, `config/` y `agents/` antes de poder desplegarse. Ver [0-overview.md](../architecture/0-overview.md).

## Requisitos

- Cuenta en [Railway](https://railway.app)
- Repositorio conectado a Railway
- Variables de entorno configuradas
- Módulos AgentCrew implementados (triggers, config, agents)

## Pasos

### 1. Configurar el servicio

- **Root Directory**: `portal/server` (o el directorio donde está el `package.json` del API)
- **Build Command**: `npm install` (o vacío si Railway lo hace automáticamente)
- **Start Command**: `npm start` (o `node index.js`)

### 2. Variables de entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| PORT | Railway lo inyecta automáticamente | - |
| NATS_URL | URL de NATS (servicio externo o add-on) | `nats://nats.example.com:4222` |
| SLACK_BOT_TOKEN | Token de Slack (opcional) | `xoxb-...` |
| SLACK_CHANNEL | Canal de Slack | `#agentcrew` |

### 3. NATS en producción

Railway no incluye NATS por defecto. Opciones:

- **NATS Cloud**: [nats.io](https://nats.io) — servicio gestionado
- **Otro proveedor**: Añadir NATS como servicio en el mismo proyecto o externo
- **Railway + Docker**: Si se usa Dockerfile, incluir NATS como servicio adicional

### 4. Deploy

1. Push a la rama conectada (ej. `main`)
2. Railway construye y despliega automáticamente
3. Verificar con `GET /health` en la URL pública

### 5. Verificación post-deploy

```bash
curl https://tu-app.railway.app/health
```

Respuesta esperada: `{"ok":true,"service":"agentcrew-api",...}`

## Rollback

En Railway: Dashboard → Deployments → seleccionar deployment anterior → Redeploy.
