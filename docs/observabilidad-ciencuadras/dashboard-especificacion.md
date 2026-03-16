# Especificación: Completar Dashboard Observabilidad Ciencuadras

**Dashboard:** [En construcción] Observabilidad Ciencuadras  
**ID:** `wei-k9v-vkx`  
**URL:** https://app.datadoghq.com/dashboard/wei-k9v-vkx/en-construccin-observabilidad-ciencuadras

## Objetivo

Vincular el dashboard con los monitores P1/P2 y agregar una sección de estado de servicios críticos.

## Widgets a Agregar

### 1. Sección: Estado de Monitores P1 (Críticos)

Agregar un widget **Monitor Summary** o **Alert Value** que muestre:

| Widget                               | Tipo            | Configuración                                                                                    |
| ------------------------------------ | --------------- | ------------------------------------------------------------------------------------------------ |
| Monitores P1 - Ausencia tráfico      | Monitor Summary | Incluir monitores: 235483770 (carrito), 236197296 (modelos-ia), 236192095 (leads-redes-sociales) |
| Monitores P1 - Despliegue defectuoso | Monitor Summary | Incluir monitores: 137246463 (motor-recomendados), 145147893 (integracion-facturacion)           |
| Monitores P1 - Anomalías             | Monitor Summary | Incluir monitores: 136713688 (leads-ms), 174687782 (listing-api-prod)                            |

### 2. Sección: Estado de Monitores P2 (Alto)

| Widget                         | Tipo            | Configuración                                                                                              |
| ------------------------------ | --------------- | ---------------------------------------------------------------------------------------------------------- |
| Monitores P2 - Alta tasa error | Monitor Summary | Incluir monitores de alta tasa de error (179154660, 129165513, 174544402, 136713806, 137283125, 179263128) |
| Monitores P2 - Error tracking  | Monitor Summary | Incluir monitores: 236212765, 236231044, 129165231, 127389404                                              |

### 3. Sección: Servicios Críticos - Métricas en Tiempo Real

| Widget                   | Query                                                                               | Descripción             |
| ------------------------ | ----------------------------------------------------------------------------------- | ----------------------- |
| Tráfico carrito-compras  | `sum:trace.servlet.request.hits{service:ciencuadras-carrito-compras-ms}.as_count()` | Requests/min al carrito |
| Errores leads-ms         | `sum:trace.servlet.request.errors{service:ciencuadras-leads-ms}.as_count()`         | Errores en leads        |
| Latencia p95 listing-api | `p95:trace.symfony.request.duration{service:ciencuadras-listing-api-prod}`          | Latencia listing        |

### 4. Widgets Existentes (Mantener)

Los tests sintéticos actuales deben conservarse:

- `synthetics.browser.step.duration.distrib` (steps je6-xkw-kzu, iey-ght-6vc, epi-vmm-zti)
- `synthetics.test_runs` (check_id: rgd-r8n-z5j, kwn-b6b-se3)

## Pasos de Implementación en Datadog

1. Abrir el dashboard `wei-k9v-vkx`
2. Clic en **Add Widget**
3. Para Monitor Summary: seleccionar tipo "Monitor Summary", agregar los IDs de monitores listados
4. Para métricas: seleccionar tipo "Timeseries" o "Query Value", pegar las queries indicadas
5. Organizar en grupos lógicos (P1, P2, Sintéticos)
6. Renombrar el dashboard quitando "[En construcción]" una vez completado

## IDs de Monitores de Referencia

```
P1 Ausencia tráfico: 235483770, 236197296, 236192095
P1 Despliegue: 137246463, 145147893
P1 Anomalías: 136713688, 174687782, 179187989, 179262978, 236232909
P2 Alta tasa error: 179154660, 129165513, 174544402, 136713806, 137283125, 179263128
P2 Error tracking: 236212765, 236231044, 129165231, 127389404
```
