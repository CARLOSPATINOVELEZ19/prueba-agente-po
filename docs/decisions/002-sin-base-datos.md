# ADR 002: Sin base de datos relacional

## Estado

Aceptado

## Contexto

AgentCrew es un orquestador de agentes que recibe triggers, publica jobs a NATS y ejecuta post-actions. No hay entidades de negocio persistentes (usuarios, productos, etc.) en el portal.

## Decisión

**No usar base de datos relacional** (PostgreSQL, MySQL, etc.) en el portal AgentCrew.

## Razones

1. **Event-driven**: El flujo es trigger → mensaje → agente → post-action. No hay necesidad de almacenar estado de negocio.
2. **Simplicidad**: Menos dependencias, menos migraciones, menos superficie de fallo.
3. **Stateless**: La API es stateless; NATS es el único almacenamiento temporal de mensajes en tránsito.

## Consecuencias

- No hay migraciones de base de datos
- Los scripts de "seeding" se adaptan a inyectar jobs de prueba vía webhook/NATS
- Si en el futuro se requiere persistencia (ej. historial de jobs), se evaluará PostgreSQL o JetStream
