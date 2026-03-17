# Runbook: Migraciones de base de datos

## Estado actual

**No aplicable**. El proyecto AgentCrew no utiliza base de datos relacional.

## Futuro

Si se añade una base de datos (ej. PostgreSQL para historial de jobs):

1. Usar un ORM o migrator (ej. `node-pg-migrate`, `Prisma migrate`)
2. Crear migraciones en `portal/server/migrations/`
3. Documentar el comando de ejecución aquí
4. Añadir paso de migración al runbook de despliegue

## Placeholder

```
# Cuando existan migraciones:
# npm run migrate
# o: npx node-pg-migrate up
```
