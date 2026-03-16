# Mapeo: Servicio Datadog ↔ Repositorio GitHub

Documentación de la correspondencia entre los nombres de servicio en Datadog y los repositorios de código.

## Servicios con Repositorio Confirmado

| Servicio Datadog                 | Repositorio GitHub                                                                                 | Ubicación en Repo                                                       | Tipo                  |
| -------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | --------------------- |
| `ciencuadras-carrito-compras-ms` | [ciencuadras-carrito-compras-ms](https://github.com/segurosbolivar/ciencuadras-carrito-compras-ms) | -                                                                       | Microservicio (Java)  |
| `ciencuadras-portal-frontend`    | `ciencuadras-portal-frontend`                                                                      | [README](../../ciencuadras-repos/ciencuadras-portal-frontend/README.md) | Angular + Datadog RUM |

## Servicios Definidos en ciencuadras-lambdas-infra

Configuración en [env.prod.tfvars](../../ciencuadras-repos/ciencuadras-lambdas-infra/environment/prod/env.prod.tfvars):

| Servicio Datadog                                                      | Variable Terraform                      | Lambda/Proceso             |
| --------------------------------------------------------------------- | --------------------------------------- | -------------------------- |
| `ciencuadras-prod-leads-integracioncrm-aws-sqs`                       | `dd_service_integracionCrm`             | leads-integracionCrm       |
| `ciencuadras-prod-automatic-process-send-notification-exp-time-mysql` | `dd_service_send_notification_exp_time` | send-notification-exp-time |
| `ciencuadras-prod-automatic-process-launch-analytics-sort`            | `dd_service_launch_analytics_sort`      | launch-analytics-sort      |
| `ciencuadras-prod-utilities-habeas-data`                              | `dd_service_habeas_data`                | utilities-habeas-data      |
| `ciencuadras-prod-solutions-image-handler`                            | `dd_service_handler_image`              | solutions-image-handler    |

## Servicios con Formato ciencuadras/prod/environment/

Estos servicios corresponden a operaciones específicas (ej. MySQL, Redis) dentro de un contexto:

| Servicio Datadog                                                   | Repositorio/Origen             | Notas                                          |
| ------------------------------------------------------------------ | ------------------------------ | ---------------------------------------------- |
| `ciencuadras/prod/environment/dd_service_save_billing_info-mysql`  | users/save-billing-info        | Operación MySQL del servicio save_billing_info |
| `ciencuadras/prod/environment/dd_service_save_billing_info-redis`  | users/save-billing-info        | Operación Redis del mismo servicio             |
| `ciencuadras/prod/environment/dd_service_save_piece_rate_products` | users/save-piece-rate-products | Servicio de tarifas por pieza                  |

**Repositorio:** Probablemente en `ciencuadras-users-ms` o similar (no presente en el workspace actual).

## Servicios Microservicios (Java/Spring - servlet.request)

Estos usan `trace.servlet.request` - son aplicaciones Java desplegadas en ECS/EC2:

| Servicio Datadog                         | Repositorio Probable                   | Notas |
| ---------------------------------------- | -------------------------------------- | ----- |
| `ciencuadras-leads-ms`                   | ciencuadras-leads-ms                   | -     |
| `ciencuadras-leads-redes-sociales-ms`    | ciencuadras-leads-\*                   | -     |
| `ciencuadras-motor-recomendados-ms`      | ciencuadras-motor-recomendados-ms      | -     |
| `ciencuadras-motor-perfilamiento-ms`     | ciencuadras-motor-perfilamiento-ms     | -     |
| `ciencuadras-integracion-marketo-ms`     | ciencuadras-integracion-marketo-ms     | -     |
| `ciencuadras-integracion-facturacion-ms` | ciencuadras-integracion-facturacion-ms | -     |
| `ciencuadras-sitios-interes-ms`          | ciencuadras-sitios-interes-ms          | -     |
| `ciencuadras-admin-ms`                   | ciencuadras-admin-ms                   | -     |
| `ciencuadras-modelos-ia-ms`              | ciencuadras-modelos-ia-ms              | -     |

**Convención:** El nombre del servicio suele coincidir con el nombre del repositorio en la org `segurosbolivar`.

## Servicios Symfony (PHP - symfony.request)

| Servicio Datadog               | Repositorio Probable            | Notas                                 |
| ------------------------------ | ------------------------------- | ------------------------------------- |
| `ciencuadras-listing-api-prod` | ciencuadras-listing-api         | API de listados                       |
| `ciencuadras-api-images-prod`  | ciencuadras-api-images o legacy | Estado: No Data - verificar si existe |

## Servicios Externos/WordPress

| Servicio Datadog                    | Origen                           |
| ----------------------------------- | -------------------------------- |
| `wordpress-server-blog-ciencuadras` | WordPress - blog.ciencuadras.com |

## Resumen por Repositorio del Workspace

| Repositorio en workspace      | Servicios relacionados                        |
| ----------------------------- | --------------------------------------------- |
| `ciencuadras-portal-frontend` | Frontend (RUM), referencia a carrito          |
| `ciencuadras-lambdas-infra`   | Todas las Lambdas, variables dd*service*\*    |
| `ciencuadras-monorepo-mf`     | Componentes compartidos, leads, publicaciones |

## Cómo Actualizar Este Documento

1. Al agregar un nuevo monitor en Datadog, documentar el servicio y su repo aquí
2. Al crear un nuevo microservicio, agregar la variable `dd_service_*` en lambdas o documentar si es ECS
3. Verificar en [APM Services](https://app.datadoghq.com/apm/services) el nombre exacto del servicio
