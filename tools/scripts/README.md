# Scripts de automatización

Scripts reutilizables para el proyecto.

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `seed-webhook-jobs.js` | Inyecta jobs de prueba vía webhook (seeding) |
| `trigger-webhook-cli.js` | Dispara un webhook manualmente desde la terminal (admin CLI) |

## Uso

### Seed (inyección de datos de prueba)

```bash
# Con API en localhost:3003
node tools/scripts/seed-webhook-jobs.js

# Con API en otra URL
AGENTCREW_URL=http://localhost:4000 node tools/scripts/seed-webhook-jobs.js
```

### Trigger webhook (admin CLI)

```bash
# Job simple
node tools/scripts/trigger-webhook-cli.js daily-report

# Job con payload custom
node tools/scripts/trigger-webhook-cli.js custom-job --payload '{"provider":"claude","message":"manual"}'
```

## Requisitos

- API AgentCrew corriendo
- NATS disponible (para que los jobs se encolen correctamente)
