# Runbook: Alta Tasa de Error en Servicio Ciencuadras

## Descripción

Alerta cuando más del 50% de las peticiones a un servicio resultan en error en los últimos 10 minutos.

**Prioridad:** P2  
**Umbral actual:** >50% de errores en ventana de 10 min  
**Notificación:** Opsgenie, equipo de desarrollo

## Servicios Monitoreados

- `ciencuadras-leads-ms`
- `ciencuadras-integracion-marketo-ms`
- `ciencuadras-sitios-interes-ms`
- `ciencuadras-motor-perfilamiento-ms`
- `ciencuadras-prod-automatic-process-send-notification-exp-time-mysql`
- `ciencuadras/prod/environment/dd_service_save_billing_info-redis`

## Pasos de Diagnóstico

### 1. Identificar el recurso afectado

- [ ] Revisar el mensaje de alerta: el campo `resource_name` indica el endpoint específico
- [ ] En Datadog APM: filtrar por `service:{{servicio}} status:error`
- [ ] Identificar si el error es en un solo endpoint o generalizado

### 2. Analizar el tipo de error

- [ ] Revisar [Error Tracking](https://app.datadoghq.com/error_tracking) para el servicio
- [ ] Clasificar: 5xx (servidor), 4xx (cliente), excepciones (código)
- [ ] Revisar logs: `service:{{servicio}} @http.status_code:5*` o `status:error`

### 3. Causas comunes

| Tipo      | Causa                 | Acción                                   |
| --------- | --------------------- | ---------------------------------------- |
| 5xx       | Timeout a dependencia | Revisar latencia de servicios downstream |
| 5xx       | Base de datos         | Revisar conexiones, queries lentas       |
| 5xx       | Memoria/CPU           | Escalar o revisar memory leaks           |
| 4xx       | Validación            | Revisar cambios recientes en API         |
| Exception | Bug en código         | Revisar stack trace, crear fix           |

### 4. Mitigación

- [ ] Si es dependencia externa (Marketo, CRM): verificar estado del proveedor
- [ ] Si es recurso específico: considerar temporalmente deshabilitar o degradar funcionalidad
- [ ] Documentar en postmortem si aplica

## Enlaces Útiles

- [Datadog Error Tracking](https://app.datadoghq.com/error_tracking)
- [APM Traces con errores](https://app.datadoghq.com/apm/traces?query=env%3Aprod%20service%3A*ciencuadras*%20status%3Aerror)
