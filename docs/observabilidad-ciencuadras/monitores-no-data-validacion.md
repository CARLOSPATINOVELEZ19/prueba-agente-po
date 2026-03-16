# Validación de Monitores con Estado "No Data"

**Objetivo:** Resolver los 3 monitores de Ciencuadras que reportan estado "No Data" en Datadog.

## Monitores Afectados

| Monitor ID | Servicio                                                   | Tipo             | Validación en Repo                                                                                                                                         |
| ---------- | ---------------------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 236200703  | `ciencuadras-prod-automatic-process-launch-analytics-sort` | Ausencia tráfico | ✅ Existe en [env.prod.tfvars](../../ciencuadras-repos/ciencuadras-lambdas-infra/environment/prod/env.prod.tfvars) como `dd_service_launch_analytics_sort` |
| 236215331  | `ciencuadras-prod-utilities-habeas-data`                   | Ausencia tráfico | ✅ Existe en [env.prod.tfvars](../../ciencuadras-repos/ciencuadras-lambdas-infra/environment/prod/env.prod.tfvars) como `dd_service_habeas_data`           |
| 175935039  | `ciencuadras-api-images-prod`                              | Alta tasa error  | ⚠️ No encontrado. Servicio de imágenes en lambdas: `ciencuadras-prod-solutions-image-handler` (Symfony vs Lambda)                                          |

## Checklist de Validación

### 1. ciencuadras-prod-automatic-process-launch-analytics-sort

- [ ] **Verificar en Datadog APM:** Buscar el servicio en [APM Services](https://app.datadoghq.com/apm/services) con el nombre exacto
- [ ] **Verificar tipo de tráfico:** El monitor usa `trace.servlet.request.hits` - confirmar que la Lambda emite traces con este tipo
- [ ] **Frecuencia del job:** Si es un proceso batch que corre esporádicamente (ej. 1x/día), considerar:
  - Aumentar ventana de evaluación (ej. last_1h en lugar de last_10m)
  - O cambiar a monitor de "anomalía de rendimiento" en lugar de "ausencia de tráfico"
- [ ] **Acción si servicio descontinuado:** Archivar el monitor en Datadog

### 2. ciencuadras-prod-utilities-habeas-data

- [ ] **Verificar en Datadog APM:** El monitor usa `trace.servlet.request.hits` pero el servicio es una Lambda - las Lambdas usan `trace.aws.lambda`
- [ ] **Corregir query del monitor:** Cambiar a `trace.aws.lambda.invocations` o `trace.aws.lambda.hits` con el tag `service:ciencuadras-prod-utilities-habeas-data`
- [ ] **Verificar invocaciones:** Revisar en CloudWatch si la Lambda recibe invocaciones
- [ ] **Acción si Lambda no se usa:** Archivar el monitor

### 3. ciencuadras-api-images-prod

- [ ] **Identificar servicio real:** El monitor usa `trace.symfony.request` - es un servicio PHP/Symfony, no Lambda
- [ ] **Buscar en otros repos:** Puede estar en un repo separado (ej. `ciencuadras-api-images` o similar)
- [ ] **Opciones:**
  - Si el servicio fue migrado a `ciencuadras-prod-solutions-image-handler`: Actualizar el monitor para usar el nuevo nombre
  - Si el servicio fue descontinuado: Archivar el monitor
  - Si el nombre cambió: Actualizar el tag `service` en el monitor

## Acciones Recomendadas

1. **Para launch-analytics-sort y habeas-data:** Los servicios existen en Terraform. Revisar si el tag `service` en el agente Datadog de las Lambdas coincide exactamente con el nombre del monitor.
2. **Para api-images-prod:** Coordinar con el equipo de infraestructura para confirmar si existe un servicio Symfony de imágenes en producción.
3. **Documentar decisión:** Una vez validado, actualizar este documento con la decisión tomada para cada monitor.
