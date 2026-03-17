# ADR 001: NATS como Message Bus

## Estado

Aceptado

## Contexto

El orquestador AgentCrew necesita un bus de mensajes para desacoplar triggers (schedules, webhooks) de los agentes que procesan los jobs.

## Opciones consideradas

1. **Redis Pub/Sub** — Simple, ampliamente usado, requiere persistencia adicional para colas
2. **RabbitMQ** — Colas robustas, más complejidad operativa
3. **NATS** — Ligero, Pub/Sub nativo, fácil de desplegar con Docker

## Decisión

Se eligió **NATS** porque:

- Ligero y rápido de levantar (`nats:2-alpine` en Docker)
- Pub/Sub nativo sin configuración adicional
- Suficiente para el volumen esperado de jobs (schedules + webhooks ocasionales)
- Menor superficie de operación que RabbitMQ

## Consecuencias

- NATS debe estar disponible para que los webhooks encolen jobs (503 si no está)
- Los agentes se suscriben al subject `agentcrew.jobs` y filtran por provider/type
- Para escalar, se puede añadir JetStream si se requiere persistencia de mensajes
