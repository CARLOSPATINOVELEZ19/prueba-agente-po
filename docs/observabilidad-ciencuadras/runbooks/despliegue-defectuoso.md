# Runbook: Despliegue Defectuoso en Servicio Ciencuadras

## Descripción

Alerta cuando Datadog detecta errores anómalos tras un despliegue reciente. Usa la funcionalidad de Deployment Analysis de Datadog.

**Prioridad:** P1  
**Ventana:** Últimos 30 minutos tras el despliegue  
**Notificación:** Opsgenie, equipo de desarrollo

## Servicios Monitoreados

- `ciencuadras-motor-recomendados-ms`
- `ciencuadras-integracion-facturacion-ms`

## Pasos de Diagnóstico

### 1. Confirmar el despliegue

- [ ] Revisar en Datadog el evento de despliegue asociado
- [ ] Identificar la versión/commit desplegada
- [ ] Verificar en Jenkins/GitLab el pipeline que ejecutó el despliegue

### 2. Analizar el impacto

- [ ] Revisar el reporte de Deployment Analysis en Datadog
- [ ] Comparar tasa de error pre vs post despliegue
- [ ] Identificar si hay nuevos tipos de errores (Error Tracking)

### 3. Decisión: Rollback o Fix forward

| Criterio                          | Acción recomendada      |
| --------------------------------- | ----------------------- |
| Error crítico, impacto alto       | **Rollback inmediato**  |
| Error en funcionalidad no crítica | Evaluar fix forward     |
| Falso positivo (pocos errores)    | Monitorear, no rollback |

### 4. Rollback

- [ ] Ejecutar rollback desde el pipeline de CI/CD
- [ ] Verificar que la versión anterior esté desplegada
- [ ] Confirmar en Datadog que la tasa de error se normaliza

### 5. Post-incidente

- [ ] Crear postmortem con causa raíz
- [ ] Identificar qué cambio introdujo el error
- [ ] Agregar test o validación para evitar recurrencia

## Enlaces Útiles

- [Datadog Deployment Tracking](https://docs.datadoghq.com/continuous_integration/guides/deployment_tracking/)
- [APM - Deployment Analysis](https://app.datadoghq.com/apm/services?query=ciencuadras)
