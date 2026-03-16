# Revisión de Umbrales: Alta Tasa de Error

## Estado Actual

Todos los monitores de "alta tasa de error" para Ciencuadras usan el mismo umbral:

- **Fórmula:** `(errores / hits) * 100 > 50`
- **Ventana:** `last_10m`
- **Granularidad:** Por `resource_name` (endpoint)

## Análisis

### Ventajas del umbral actual (50%)

- Detecta degradación severa rápidamente
- Fácil de entender: "más de la mitad de las peticiones fallan"
- Evita alertas por ruido en servicios con bajo volumen

### Riesgos y consideraciones

| Aspecto                    | Riesgo                                                      | Recomendación                                                    |
| -------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------- |
| Servicios con bajo tráfico | 1 error en 2 requests = 50% → alerta inmediata              | Considerar umbral mínimo de hits (ej. alertar solo si hits > 10) |
| Picos transitorios         | Un burst de errores de 1 min puede disparar la alerta       | Evaluar ventana de 15m o agregar condición de persistencia       |
| Servicios batch            | Procesos que fallan en lote pueden tener 100% legítimamente | Excluir o usar umbral diferente para jobs                        |
| Recursos específicos       | Un endpoint con 50% puede enmascarar que el resto está bien | El agrupamiento por `resource_name` ya mitiga esto               |

## Recomendaciones por Tipo de Servicio

### 1. Servicios de alto tráfico (leads-ms, listing-api, carrito)

**Mantener 50%** con posible ajuste:

- Agregar condición: `sum(hits) > 20` en la ventana para evitar falsos positivos con bajo volumen
- Evaluar agregar nivel **Warning** en 30% para detección temprana

### 2. Servicios de integración (Marketo, facturación, CRM)

**Mantener 50%** - Las integraciones suelen tener tráfico moderado y fallos pueden ser críticos.

### 3. Lambdas / procesos batch

**Revisar caso por caso:**

- Si el proceso tiene pocas invocaciones: 50% puede ser 1 de 2 fallos → considerar umbral absoluto (ej. "más de 5 errores")
- Para `send-notification-exp-time-mysql`: evaluar si 50% es apropiado dado el patrón de uso

## Propuesta de Cambio (Opcional)

Para monitores que generen ruido, considerar esta query alternativa:

```
# Actual
sum(last_10m):(errors/hits)*100 > 50

# Alternativa con mínimo de volumen
sum(last_10m):(errors/hits)*100 > 50 AND sum(last_10m):hits > 20
```

O usar **composite monitor** con dos condiciones:

1. Tasa de error > 50%
2. Número de requests > umbral mínimo

## Acción Requerida

1. **Revisar historial de alertas** en Datadog (últimos 3 meses) para monitores de alta tasa de error
2. **Identificar falsos positivos:** alertas que se resolvieron solas o no requirieron acción
3. **Documentar** en este archivo los monitores que requieren ajuste
4. **Implementar** cambios solo en monitores con evidencia de ruido
