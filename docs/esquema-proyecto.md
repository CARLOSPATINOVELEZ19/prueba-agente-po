# Esquema del proyecto prueba-agente-po

> Vista general de componentes, flujos y configuraciones.

---

## Diagrama principal

```mermaid
flowchart TB
    subgraph proyecto ["Proyecto prueba-agente-po"]
        subgraph codigo ["Código fuente"]
            tests[tests/]
            scripts[scripts/]
            tools[tools/scripts/]
            docs[docs/]
            cursorRules[.cursor/rules/]
        end

        subgraph workspace ["Workspace - artefactos"]
            platformsJson[config/platforms.json]
            plans[plans/]
            reports[reports/]
            audit[audit/]
            observabilidad[observabilidad/]
        end
    end

    subgraph platformsConfig ["platforms.json - Ciencuadras"]
        jiraConfig[Jira GD768]
        datadogConfig[Datadog us1]
        serviceToRepos[serviceToRepos: 12 servicios]
        githubRepos[github.repos: 5 repos]
    end

    subgraph automation ["Automation Datadog Alert"]
        trigger[Schedule cada 15 min]
        p0[P0: search status:alert]
        p1[P1: Validar servicios]
        p2[P2: Consultar repos]
        p3[P3: Generar plan]
        p4[P4: Buscar HU]
        p5[P5: Crear HU]
    end

    subgraph mcps ["MCPs"]
        mcpDatadog[Datadog]
        mcpAtlassian[Atlassian]
        mcpGitHub[GitHub]
    end

    subgraph externos ["Externos"]
        datadog[Datadog]
        jira[Jira]
        github[GitHub]
    end

    platformsJson --> platformsConfig
    serviceToRepos --> p2
    githubRepos --> p2

    trigger --> p0
    p0 --> p1
    p1 --> p2
    p2 --> p3
    p3 --> p4
    p4 --> p5

    p0 --> mcpDatadog
    p1 --> mcpDatadog
    p2 --> mcpGitHub
    p4 --> mcpAtlassian
    p5 --> mcpAtlassian

    mcpDatadog --> datadog
    mcpAtlassian --> jira
    mcpGitHub --> github

    p3 --> plans
```

> **Editar en Draw.io:** Abre [diagrams.net](https://app.diagrams.net) → Arrange → Insert → Advanced → Mermaid, y pega el contenido de [diagrams/esquema-proyecto-completo.mmd](../diagrams/esquema-proyecto-completo.mmd).

### Diagramas de análisis: Agnóstico vs Particular

| Diagrama | Descripción |
|----------|-------------|
| [Esquema funcionamiento agnóstico](./diagrams/esquema-funcionamiento-agnostico.html) | Flujos transversales: onboarding, E2E, auditoría, reportes, agentes |
| [Esquema acciones particulares](./diagrams/esquema-acciones-particulares.html) | Acciones específicas del proyecto (Ciencuadras): Automation Datadog, Jira GD768, serviceToRepos |

---

## Resumen por capa

| Capa | Componentes |
|------|-------------|
| **Código** | tests/, scripts/, tools/scripts/, docs/, .cursor/rules/ |
| **Workspace** | config/platforms.json, plans/, reports/, audit/, observabilidad/ |
| **Config** | Jira GD768, Datadog us1, serviceToRepos (12), github.repos (5) |
| **Automation** | Schedule → 6 pasos (MCP Datadog → validar → repos → plan → Jira) |
| **MCPs** | Datadog, Atlassian, GitHub |
| **Externos** | Datadog, Jira, GitHub |

---

## Flujos principales

| Flujo | Entrada | Salida |
|-------|---------|--------|
| **Automation Datadog** | Schedule + MCP Datadog `status:alert` | plan en plans/, HU en Jira |
| **Tests E2E** | platforms.json (baseURL, smokePaths) | playwright report |
| **Auditoría** | platforms.json (auditZones) | Workspace/audit/ |
| **Reportes** | jira-cycle-*.json | Workspace/reports/ → deploy:pages |

---

## Configuración actual (Ciencuadras)

| Sección | Valores |
|---------|---------|
| **Jira** | projectKey: GD768, incidentBoardId: 35754 |
| **Datadog** | site: us1, dashboardIds: wei-k9v-vkx |
| **serviceToRepos** | 12 servicios (admin-eventos-masivos-ms, carrito-compras-ms, portal-frontend, etc.) |
| **github.repos** | 5 repos (admin-eventos-masivos-ms, admin-ms, lambdas-infra, portal-frontend, carrito-compras-ms) |

---

## Referencias

- [ESTRUCTURA.md](./ESTRUCTURA.md) — Árbol de directorios
- [runbook/automation-datadog-alert.md](./runbook/automation-datadog-alert.md) — Flujo de automation
- [architecture/0-overview.md](./architecture/0-overview.md) — Visión general
