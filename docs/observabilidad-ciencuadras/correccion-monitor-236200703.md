# Corrección del Mensaje de Alerta - Monitor 236200703

## Problema

El monitor **[URGENTE] El servicio ciencuadras-prod-automatic-process-launch-analytics-sort presenta ausencia de trafico** tiene un mensaje de alerta incorrecto:

- **Query del monitor:** `ciencuadras-prod-automatic-process-launch-analytics-sort` (correcto)
- **Mensaje actual:** Hace referencia a "ciencuadras-leads-ms" (incorrecto - copiado de otro monitor)

## Pasos para Corregir en Datadog

1. Ir a [Monitor Manager](https://app.datadoghq.com/monitors) y buscar el monitor por ID `236200703` o por nombre "ciencuadras-prod-automatic-process-launch-analytics-sort"
2. Editar el monitor (clic en el nombre)
3. En la sección **"Say what's happening"** / **"Mensaje de notificación"**, reemplazar el texto actual por:

```
{{#is_alert}}
El servicio ciencuadras-prod-automatic-process-launch-analytics-sort presenta ausencia de tráfico.
Tráfico: {{value}}.
Servicio: {{service}}

Ver servicio -> [clic ingresar](https://app.datadoghq.com/apm/traces?query=%40_top_level%3A1%20env%3Aprod%20service%3A{{service.name}}%20operation_name%3Aservlet.request&cols=core_service%2Ccore_resource_name%2Clog_duration%2Clog_http.method%2Clog_http.status_code&historicalData=false&messageDisplay=inline&query_translation_version=v0&sort=desc&spanType=service-entry&start={{first_triggered_at_epoch}}&end={{last_triggered_at_epoch}})

Notificar a: @opsgenie @Infra_Cloud@segurosbolivar.com
{{override_priority 'P1'}}
{{/is_alert}}
```

4. Guardar los cambios

## Nota

Este monitor actualmente tiene estado **No Data**. Antes de corregir el mensaje, considerar completar la validación descrita en [monitores-no-data-validacion.md](./monitores-no-data-validacion.md) para determinar si el monitor debe mantenerse, ajustarse (cambio de query) o archivarse.
