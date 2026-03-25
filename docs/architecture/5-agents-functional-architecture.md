# Arquitectura Funcional de Agentes

> **Documento para negocio:** Explica cómo trabajan los agentes de IA en el proyecto y qué valor aportan.

---

## ¿Qué problema resolvemos?

Las tareas de desarrollo suelen requerir **muchos pasos manuales**: leer tickets en Jira, revisar el código, planificar cambios, validar que todo funcione. Esto consume tiempo y puede generar errores por falta de contexto.

**Los agentes automatizan y coordinan** estas fases, reduciendo tiempo y aumentando la trazabilidad entre negocio (Jira) y calidad (tests).

---

## El equipo de agentes en una imagen

```mermaid
flowchart LR
    subgraph equipo ["Equipo de Agentes de IA"]
        direction TB
        O[🎯 Orquestador]
        O --> S[🔍 Scout]
        O --> H[📚 Historian]
        O --> G[🛡️ Guardian]
        O --> R[📂 GitHub Repos]
        O --> P[📋 PO-Agile]
        O --> D[📝 Doc Updater]
        O --> CA[☁️ Cloud Agent]
    end

    subgraph fuentes ["Fuentes de información"]
        J[Jira]
        C[Código]
        T[Tests]
        GH[Repos GitHub]
        DOC[docs/]
        DD[Datadog]
    end

    S --> J
    H --> C
    G --> T
    R --> GH
    P --> J
    D --> C
    D --> DOC
    CA --> J
    CA --> DD
    CA --> GH
```

> **Cloud Agent:** corre en **Cursor Automations** (programado), no dentro del chat. Orquesta alertas Datadog, repos y Jira según el runbook.

> **[Abrir en Draw.io](../diagrams/equipo-agentes.html)** — Editar diagrama en la aplicación

| Agente | Rol en lenguaje simple | ¿Qué hace? |
|--------|------------------------|-------------|
| **🎯 Orquestador** | El coordinador | **Siempre** elige qué especialista actúa y lo **activa** con la herramienta **Task** (subagentes); no absorbe el trabajo de dominio salvo petición explícita del usuario en ese mensaje |
| **🔍 Scout** | El explorador | Lee los tickets de Jira y extrae qué se necesita hacer (requerimientos) |
| **📚 Historian** | El experto en historia | Revisa el código y los cambios recientes para evitar repetir errores del pasado |
| **🛡️ Guardian** | El validador | Ejecuta pruebas automáticas y solo da por terminada la tarea cuando todo pasa |
| **📂 GitHub Repos** | El lector de repos | Lee repositorios externos de la plataforma (PRs, archivos, commits) vía MCP GitHub |
| **📋 PO-Agile** | El Product Owner | Transforma requisitos en Historias de Usuario listas para Jira (formato INVEST, criterios Dado-Cuando-Entonces) |
| **📝 Doc Updater** | El documentador | Actualiza la documentación cuando el código cambia con una solución definitiva (se activa en pre-commit) |
| **☁️ Cloud Agent Datadog** | El vigilante programado | En horario fijo, revisa alertas en Datadog, cruza con repos y puede generar planes y HUs en Jira (ver runbook) |

### Activación en Cursor (chat / Composer)

En el IDE, la **función concreta** que enciende a cada especialista es la herramienta **Task** (subagentes): el Orquestador debe anunciar la decisión y lanzar el `subagent_type` adecuado (`explore`, `shell`, `generalPurpose`, etc.) según el mapa en `.cursor/rules/00-swarm-orchestrator.mdc`. El script `npm run demo:agentes` solo **ilustra** el flujo en consola; no sustituye a Task.

---

## Flujo completo: de la idea al resultado validado

```mermaid
flowchart TB
    subgraph entrada [Entrada]
        U[👤 Usuario: "Necesito implementar X"]
    end

    subgraph fases [4 Fases del Protocolo]
        F1[1️⃣ ANÁLISIS<br/>Scout lee Jira]
        F2[2️⃣ CONTEXTO<br/>Historian revisa código]
        F3[3️⃣ PLANIFICACIÓN<br/>Plan en WORKSPACE_ROOT/plans/]
        F4[4️⃣ VALIDACIÓN<br/>Guardian ejecuta Playwright]
    end

    subgraph salida [Salida]
        R[✅ Tarea completada con reporte de éxito]
    end

    U --> F1
    F1 --> F2
    F2 --> F3
    F3 --> F4
    F4 --> R
```

> **[Abrir en Draw.io](../diagrams/4-fases-protocolo.html)** — Editar diagrama en la aplicación

---

## Detalle por fase (para explicar en reuniones)

### 1️⃣ Fase de Análisis — Scout

**Pregunta que responde:** *¿Qué quiere el negocio?*

- Conecta con **Jira** (gestión de proyectos)
- Lee el ticket asignado
- Extrae los requerimientos en lenguaje claro

**Valor para negocio:** Trazabilidad directa entre lo que pide Jira y lo que se implementa.

---

### 2️⃣ Fase de Contexto — Historian

**Pregunta que responde:** *¿Qué impacto tendrá este cambio?*

- Revisa el **código actual** del proyecto
- Analiza **cambios recientes** (PRs, commits)
- Identifica riesgos y dependencias

**Valor para negocio:** Menos errores por falta de contexto; decisiones más informadas.

---

### 3️⃣ Fase de Planificación

**Pregunta que responde:** *¿Cómo lo haremos paso a paso?*

- Genera un **plan escrito** antes de tocar código
- Se guarda en `{WORKSPACE_ROOT}/plans/` (por defecto `Workspace/ciencuadras/plans/`)
- Permite revisar la estrategia antes de ejecutar

**Valor para negocio:** Transparencia y posibilidad de ajustar el enfoque antes de invertir tiempo en desarrollo.

---

### 4️⃣ Fase de Validación — Guardian

**Pregunta que responde:** *¿Funciona correctamente?*

- Ejecuta **pruebas automáticas** (Playwright)
- Si algo falla, propone correcciones
- Solo da por terminada la tarea cuando las pruebas pasan

**Valor para negocio:** Calidad asegurada; menos bugs en producción.

---

### 5️⃣ Agente especializado — GitHub Repos

**Pregunta que responde:** *¿Qué hay en los repos de la plataforma?*

- Lee **repositorios externos** definidos en `platforms.json` (org/repos)
- Usa MCP GitHub para: archivos, PRs, commits, búsqueda de código
- Se activa al planificar o al trabajar con config de plataforma

**Valor para negocio:** Contexto completo de la plataforma sin clonar; análisis de múltiples repos en un solo flujo.

---

### 6️⃣ Agente especializado — PO-Agile

**Pregunta que responde:** *¿Cómo expresamos este requisito como Historia de Usuario lista para Sprint?*

- Transforma **requisitos, ideas o descripciones** en Historias de Usuario impecables
- Aplica formato **INVEST** y criterios de aceptación **Dado-Cuando-Entonces**
- Se activa al trabajar con planes, specs o docs (`{WORKSPACE_ROOT}/plans/`, `**/docs/**`, `**/*.spec.md`)
- Puede crear la HU directamente en **Jira** vía MCP Atlassian si se solicita

**Valor para negocio:** Historias claras y listas para desarrollo; menos ambigüedad en el backlog; criterios de aceptación testables.

---

### 7️⃣ Agente especializado — Doc Updater

**Pregunta que responde:** *¿La documentación refleja el código que acabamos de cambiar?*

- Actualiza `docs/` y referencias cuando hay una solución estable
- Puede usar el skill de diagramas Draw.io si cambian flujos visuales
- El hook **pre-commit** (`.githooks/pre-commit`) recuerda revisar docs si solo cambió código

**Valor para negocio:** Menos deuda de documentación; onboarding y operación alineados con el estado real del repo.

---

### 8️⃣ Cloud Agent — alertas Datadog

**Pregunta que responde:** *¿Hay incidentes recurrentes que deban convertirse en trabajo priorizado en Jira?*

- Se ejecuta como **automation en la nube** (Cursor), en horario (**scheduled**; sin webhook), no como conversación interactiva
- Usa MCPs Datadog, GitHub y Atlassian según `docs/templates/automation-datadog-alert-prompt.md`
- Deja planes en `{WORKSPACE_ROOT}/plans/` y puede crear o enriquecer historias en Jira

**Valor para negocio:** Puente automático entre observabilidad y backlog; menos pérdida de contexto entre alertas y desarrollo.

---

## Resumen ejecutivo (una diapositiva)

| Concepto | Explicación |
|----------|-------------|
| **Qué es** | Un equipo de agentes de IA que coordina análisis, planificación y validación de tareas de desarrollo |
| **Cómo trabaja** | 4 fases secuenciales: Análisis (Jira) → Contexto (código) → Planificación → Validación (tests) |
| **Beneficio principal** | Acelera el ciclo de desarrollo con trazabilidad a Jira y validación automática de calidad |
| **Herramientas integradas** | Jira, GitHub, Playwright, Datadog |
| **Agentes especializados** | GitHub Repos, PO-Agile, Doc Updater; **Cloud Agent** (Datadog→Jira, programado) |

---

## Documentos técnicos relacionados

- [0-overview.md](./0-overview.md) — Visión general del proyecto
- [4-workspace.md](./4-workspace.md) — Dónde se guardan los planes y reportes
- [6-inventario-agentes.md](./6-inventario-agentes.md) — **Inventario unificado** de agentes (MCPs, skills, archivos, prompt)
- [../ESTRUCTURA.md](../ESTRUCTURA.md) — Estructura completa del proyecto
