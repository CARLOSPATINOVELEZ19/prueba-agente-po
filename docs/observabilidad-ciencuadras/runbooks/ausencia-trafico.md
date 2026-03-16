# Runbook: Ausencia de Tráfico en Servicio Ciencuadras

## Descripción

Alerta cuando un servicio de Ciencuadras no recibe tráfico en los últimos 10 minutos. Indica posible caída del servicio o interrupción.

**Prioridad:** P1 (URGENTE)  
**Notificación:** Opsgenie, Infra_Cloud, equipo de desarrollo

## Servicios Monitoreados

- `ciencuadras-carrito-compras-ms` (crítico - checkout)
- `ciencuadras-modelos-ia-ms`
- `ciencuadras-leads-redes-sociales-ms`
- `ciencuadras-prod-automatic-process-launch-analytics-sort`
- `ciencuadras-prod-utilities-habeas-data`

## Pasos de Diagnóstico

### 1. Confirmar el alcance

- [ ] Identificar el servicio afectado en el mensaje de la alerta
- [ ] Verificar en [Datadog APM](https://app.datadoghq.com/apm/services) si hay traces recientes
- [ ] Distinguir: ¿es un microservicio (tráfico continuo) o un job batch (tráfico esporádico)?

### 2. Para microservicios (carrito, leads, modelos-ia)

- [ ] Revisar health checks del servicio en ECS/Kubernetes
- [ ] Verificar logs en Datadog: `service:{{nombre-servicio}} env:prod`
- [ ] Comprobar si hay despliegues recientes que puedan haber causado la caída
- [ ] Revisar dependencias: ¿el servicio upstream está fallando?

### 3. Para Lambdas / procesos batch

- [ ] Verificar en CloudWatch si la Lambda está siendo invocada
- [ ] Revisar EventBridge/CloudWatch Events: ¿el trigger está activo?
- [ ] Si el job corre 1x/día o menos: considerar si la alerta es apropiada (ventana de 10m puede ser muy corta)

### 4. Acciones de Mitigación

| Causa probable             | Acción                                               |
| -------------------------- | ---------------------------------------------------- |
| Despliegue fallido         | Rollback a versión anterior                          |
| Servicio caído             | Reiniciar pods/tasks en ECS                          |
| Lambda no invocada         | Revisar triggers, ejecutar manualmente si es crítico |
| Falso positivo (job batch) | Mute temporal o ajustar ventana del monitor          |

## Enlaces Útiles

- [Datadog APM - Ciencuadras](https://app.datadoghq.com/apm/traces?query=%40_top_level%3A1%20env%3Aprod%20service%3A*ciencuadras*)
- [Dashboard Observabilidad Ciencuadras](https://app.datadoghq.com/dashboard/wei-k9v-vkx/en-construccin-observabilidad-ciencuadras)
