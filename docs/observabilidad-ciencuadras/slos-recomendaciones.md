# SLOs y Alertas Basadas en SLO - Ciencuadras

## Objetivo

Definir Objetivos de Nivel de Servicio (SLOs) para los servicios críticos de Ciencuadras y crear alertas que se disparen cuando se incumplan.

## Servicios Candidatos para SLO

| Servicio                                      | Criticidad | SLO Propuesto                  | Métrica Base                                   |
| --------------------------------------------- | ---------- | ------------------------------ | ---------------------------------------------- |
| ciencuadras-carrito-compras-ms                | Crítica    | 99.5% disponibilidad           | `trace.servlet.request.hits` (success) / total |
| ciencuadras-leads-ms                          | Crítica    | 99% disponibilidad, p95 < 2s   | `trace.servlet.request`                        |
| ciencuadras-listing-api-prod                  | Alta       | 99% disponibilidad, p95 < 1.5s | `trace.symfony.request`                        |
| ciencuadras-integracion-facturacion-ms        | Alta       | 99% disponibilidad             | `trace.servlet.request`                        |
| ciencuadras-prod-leads-integracioncrm-aws-sqs | Alta       | 99% procesamiento exitoso      | Traces sin error                               |

## Definición de SLOs en Datadog

### 1. SLO de Disponibilidad (Error Budget)

**Ejemplo para carrito-compras-ms:**

- **Tipo:** Monitor-based SLO (usar monitor de alta tasa de error existente)
- **Objetivo:** 99.5% de tiempo en estado OK
- **Ventana:** Rolling 30 days
- **Fórmula:** `(1 - tiempo_en_alert / tiempo_total) * 100 >= 99.5`

O crear SLO basado en métricas:

- **Numerador:** `sum:trace.servlet.request.hits{service:ciencuadras-carrito-compras-ms}.as_count()`
- **Denominador:** `sum:trace.servlet.request.hits{service:ciencuadras-carrito-compras-ms}.as_count() + sum:trace.servlet.request.errors{service:ciencuadras-carrito-compras-ms}.as_count()`
- **Objetivo:** 99.5%

### 2. SLO de Latencia

**Ejemplo para leads-ms:**

- **Métrica:** `p95:trace.servlet.request.duration{service:ciencuadras-leads-ms}`
- **Objetivo:** 95% de requests bajo 2000ms
- **Query:** `p95:trace.servlet.request.duration < 2000` para el 95% del tiempo

### 3. Alertas Basadas en SLO (Error Budget Burn Rate)

En lugar de alertar solo por umbrales fijos, alertar cuando:

- **Error budget restante < 10%** (crítico)
- **Burn rate > 14.4** (consumiendo budget 14.4x más rápido que lo permitido para agotar en 1 día)

**Configuración en Datadog:**

- Crear SLO en Datadog → SLOs
- Vincular alerta al SLO con condición de "Error budget remaining" o "Burn rate"

## Plan de Implementación

| Fase | Acción                                                                  | Prioridad |
| ---- | ----------------------------------------------------------------------- | --------- |
| 1    | Crear SLO para ciencuadras-carrito-compras-ms (disponibilidad 99.5%)    | Alta      |
| 2    | Crear SLO para ciencuadras-leads-ms (disponibilidad 99%, latencia p95)  | Alta      |
| 3    | Crear SLO para ciencuadras-listing-api-prod                             | Media     |
| 4    | Configurar alertas de error budget para los SLOs creados                | Alta      |
| 5    | Integrar SLOs en el dashboard de observabilidad                         | Media     |
| 6    | Documentar en runbooks: "Si SLO en riesgo, escalar según procedimiento" | Media     |

## Beneficios

1. **Alertas más inteligentes:** Se alerta cuando el error budget se consume rápidamente, no solo por un pico puntual
2. **Visibilidad de tendencias:** Ver cuánto "presupuesto" de errores queda para el período
3. **Priorización:** Enfocar esfuerzos en servicios que están consumiendo su error budget
4. **Comunicación:** Poder reportar "99.2% de disponibilidad este mes" con datos reales

## Referencias

- [Datadog SLOs Documentation](https://docs.datadoghq.com/monitors/service_level_objectives/)
- [Alerting on SLOs](https://docs.datadoghq.com/monitors/service_level_objectives/#alert-on-slos)
