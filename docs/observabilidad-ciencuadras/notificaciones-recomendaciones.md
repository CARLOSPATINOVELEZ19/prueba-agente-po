# Recomendaciones: Unificación de Notificaciones

## Estado Actual

Todos los monitores de Ciencuadras notifican al **mismo grupo**:

- **Opsgenie** (escalación 24/7)
- **Infra_Cloud@segurosbolivar.com** (solo en alertas URGENTE de ausencia de tráfico)
- **8 personas** del equipo (alejandro.tique, camilo.andres.solano, carlos.patino, daniel.chavarria, duvan.gianinni.penaloza, hernan.castano, john.castaneda, oscar.lobaton)
- Algunos monitores incluyen: **olivet.chona** (facturación/billing), **ricardo.gomez** (api-images, integracion-facturacion)

## Problemas Identificados

1. **Fatiga de alertas:** Todo el equipo recibe todas las alertas, sin distinción de severidad
2. **Sin diferenciación por servicio:** Quien mantiene "leads" recibe también alertas de "facturación"
3. **Opsgenie puede saturarse** si no se configuran prioridades correctamente
4. **Horario:** No hay distinción entre horario laboral y fuera de horario

## Recomendaciones

### 1. Rutas por Severidad (Corto plazo)

| Prioridad        | Canal principal                        | Escalación                       |
| ---------------- | -------------------------------------- | -------------------------------- |
| P1 (URGENTE)     | Opsgenie + Slack #ciencuadras-critical | Infra_Cloud + on-call            |
| P2 (Alto)        | Slack #ciencuadras-alerts              | Opsgenie si no hay ack en 30 min |
| P3 (Informativo) | Solo Slack #ciencuadras-alerts         | Sin escalación                   |

### 2. Rutas por Servicio/Dominio (Mediano plazo)

| Dominio         | Responsables          | Servicios                                             |
| --------------- | --------------------- | ----------------------------------------------------- |
| Leads           | Equipo Leads          | leads-ms, leads-redes-sociales, leads-integracioncrm  |
| Carrito/Compras | Equipo Carrito        | carrito-compras-ms                                    |
| Facturación     | olivet.chona + equipo | integracion-facturacion, save_billing_info            |
| Infraestructura | Infra_Cloud           | Ausencia tráfico, Lambdas                             |
| Otros           | Equipo general        | listing-api, motor-recomendados, sitios-interes, etc. |

### 3. Configuración en Datadog

1. **Crear Notification Policies** en Datadog para cada severidad
2. **Usar tags en monitores:** `team:ciencuadras-leads`, `team:ciencuadras-facturacion`, etc.
3. **Configurar Opsgenie** con reglas de prioridad según el tag `priority` del monitor

### 4. Mensajes de Notificación

Incluir en cada mensaje:

- **Servicio afectado** (visible en el asunto)
- **Severidad** (P1/P2)
- **Enlace directo** al runbook correspondiente
- **Enlace a Datadog** para diagnóstico

Ejemplo de mejora en mensaje:

```
[P1] ciencuadras-carrito-compras-ms - Ausencia de tráfico
Runbook: docs/.../runbooks/ausencia-trafico.md
Ver en Datadog: [link]
```

## Plan de Implementación

| Fase | Acción                                                          | Responsable           |
| ---- | --------------------------------------------------------------- | --------------------- |
| 1    | Crear canales Slack #ciencuadras-critical y #ciencuadras-alerts | DevOps                |
| 2    | Configurar Opsgenie para P1 con prioridad alta                  | DevOps                |
| 3    | Agregar tags `team` y `priority` a monitores existentes         | Equipo observabilidad |
| 4    | Actualizar mensajes con enlace a runbooks                       | Equipo observabilidad |
| 5    | Definir y documentar on-call rotation                           | Líder técnico         |
