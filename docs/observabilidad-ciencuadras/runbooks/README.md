# Runbooks - Alertas Ciencuadras

Procedimientos operativos para responder a las alertas de Datadog del proyecto Ciencuadras.

## Índice

| Tipo de Alerta               | Runbook                                                                                                                           | Prioridad |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Ausencia de tráfico          | [ausencia-trafico.md](./ausencia-trafico.md)                                                                                      | P1        |
| Alta tasa de error           | [alta-tasa-error.md](./alta-tasa-error.md)                                                                                        | P2        |
| Despliegue defectuoso        | [despliegue-defectuoso.md](./despliegue-defectuoso.md)                                                                            | P1        |
| Error tracking (nuevo error) | Ver [alta-tasa-error.md](./alta-tasa-error.md) - sección Error Tracking                                                           | P2        |
| Cambio anormal rendimiento   | Ver [ausencia-trafico.md](./ausencia-trafico.md) - validar tráfico y [alta-tasa-error.md](./alta-tasa-error.md) - revisar errores | P1        |

## Uso

1. Al recibir una alerta en Opsgenie/Slack, identificar el tipo
2. Abrir el runbook correspondiente
3. Seguir los pasos de diagnóstico en orden
4. Documentar la resolución
