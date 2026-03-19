# Inventario de Agentes

> **Documento unificado** para identificar, actualizar y mantener los agentes del proyecto. Cada agente incluye: nombre, objetivo, MCPs, skills, tools, scripts, archivos de código y prompt.

---

## Índice de agentes

| # | Agente | Tipo | Regla/Prompt |
|---|--------|------|--------------|
| 1 | Orquestador (The Architect) | Cursor Rule | `.cursor/rules/00-swarm-orchestrator.mdc` |
| 2 | Scout | Fase del Orquestador | Embebido en 00-swarm-orchestrator |
| 3 | Historian | Fase del Orquestador | Embebido en 00-swarm-orchestrator |
| 4 | Guardian (QA Specialist) | Cursor Rule | `.cursor/rules/agent-tech-guardian.mdc` |
| 5 | GitHub Repos | Cursor Rule | `.cursor/rules/agent-github-repos.mdc` |
| 6 | PO-Agile-Master | Cursor Rule | `.cursor/rules/agent-po-agile-master.mdc` |
| 7 | Doc Updater | Cursor Rule | `.cursor/rules/agent-doc-updater.mdc` |
| 8 | Cloud Agent Datadog Alert | Cursor Automation | `docs/templates/automation-datadog-alert-prompt.md` |

---

## 1. Orquestador (The Architect)

| Campo | Valor |
|-------|-------|
| **Nombre** | Orquestador / The Architect |
| **Objetivo** | Liderar el enjambre de agentes y orquestar las fases: Análisis (Scout) → Contexto (Historian) → Planificación → Validación (Guardian). Asegura que cada fase se complete antes de pasar a la siguiente. |
| **MCPs** | `atlassian` (Jira, Confluence) |
| **Skills** | — |
| **Tools** | `@Codebase`, `gh pr list` |
| **Scripts** | — |
| **Archivos de código** | `.cursor/rules/00-swarm-orchestrator.mdc`, `.cursor/rules/01-plans-location.mdc` |
| **Archivo de prompt** | No aplica (regla Cursor) |
| **Otra información** | **alwaysApply: true**. Regla maestra. Delega en Scout (MCP Jira), Historian (Codebase + gh), Guardian (Playwright). Genera planes en `Workspace/plans/`. Restricción: no mezclar contextos; si la tarea es compleja, indicar Subagente. |

---

## 2. Scout (Fase de Análisis)

| Campo | Valor |
|-------|-------|
| **Nombre** | Scout / El explorador |
| **Objetivo** | Leer tickets de Jira y extraer requerimientos. Responde: *¿Qué quiere el negocio?* |
| **MCPs** | `atlassian` (Jira: getJiraIssue, searchJiraIssuesUsingJql, getVisibleJiraProjects) |
| **Skills** | — |
| **Tools** | MCP Atlassian |
| **Scripts** | — |
| **Archivos de código** | Embebido en `.cursor/rules/00-swarm-orchestrator.mdc` (Fase 1). Referencia: `rules/AGENTS.md` (Protocolo de Descubrimiento). |
| **Archivo de prompt** | No aplica (fase del Orquestador) |
| **Otra información** | No tiene regla propia. El Orquestador ejecuta esta fase usando MCP Jira. Fuente de tickets: Jira (projectKey desde `platforms.json`). |

---

## 3. Historian (Fase de Contexto)

| Campo | Valor |
|-------|-------|
| **Nombre** | Historian / El experto en historia |
| **Objetivo** | Revisar código y cambios recientes para evitar repetir errores. Responde: *¿Qué impacto tendrá este cambio?* |
| **MCPs** | — |
| **Skills** | — |
| **Tools** | `@Codebase`, `gh pr list`, `git log -n 5`, `tree -L 3` |
| **Scripts** | — |
| **Archivos de código** | Embebido en `.cursor/rules/00-swarm-orchestrator.mdc` (Fase 2). Referencia: `rules/AGENTS.md` (Contexto de Git, Análisis Técnico). |
| **Archivo de prompt** | No aplica (fase del Orquestador) |
| **Otra información** | No tiene regla propia. El Orquestador ejecuta esta fase. Usa Codebase para impacto técnico y `gh pr list` para cambios recientes. |

---

## 4. Guardian (QA Specialist)

| Campo | Valor |
|-------|-------|
| **Nombre** | Guardian / QA Specialist |
| **Objetivo** | Validar que los tests E2E pasan. Self-healing de tests. Exigir cobertura mínima. Solo dar por terminada la tarea cuando Playwright pasa. |
| **MCPs** | — |
| **Skills** | `prueba` (`.cursor/skills/prueba/SKILL.md`) — Playwright, corrección de fallos |
| **Tools** | `npx playwright test` |
| **Scripts** | `npm test`, `npm run test:ui` |
| **Archivos de código** | `.cursor/rules/agent-tech-guardian.mdc`, `tests/smoke.spec.js`, `playwright.config.js`, `scripts/get-platform-config.js` |
| **Archivo de prompt** | No aplica (regla Cursor) |
| **Otra información** | **globs:** `**/tests/**`, `playwright.config.js`, `**/*.spec.js`. **alwaysApply: false**. Se activa al trabajar con tests. Referencia cobertura: `docs/architecture/3-tech-stack-org.md` (70% recomendado). |

---

## 5. GitHub Repos (Platform Repos Reader)

| Campo | Valor |
|-------|-------|
| **Nombre** | GitHub Repos / Platform Repos Reader |
| **Objetivo** | Leer y analizar repositorios externos de la plataforma. Responde: *¿Qué hay en los repos de la plataforma?* |
| **MCPs** | `user-github` (get_file_contents, list_pull_requests, list_commits, list_branches, search_code, list_issues, search_repositories) |
| **Skills** | — |
| **Tools** | MCP GitHub, CLI `gh` (gh repo view, gh pr list, gh api) |
| **Scripts** | — |
| **Archivos de código** | `.cursor/rules/agent-github-repos.mdc`, `Workspace/config/platforms.json` (github.repos), `docs/templates/platforms.example.json` |
| **Archivo de prompt** | No aplica (regla Cursor) |
| **Otra información** | **globs:** `Workspace/config/platforms.json`, `Workspace/plans/**`, `**/platforms.json`, `docs/templates/platforms.example.json`. **alwaysApply: false**. Solo lectura; no push/merge. Repos definidos en `platforms[].github.repos`. |

---

## 6. PO-Agile-Master (Product Owner / Agile Master)

| Campo | Valor |
|-------|-------|
| **Nombre** | PO-Agile-Master |
| **Objetivo** | Transformar requisitos, ideas o descripciones en Historias de Usuario impecables, claras y listas para Sprint. Formato INVEST, criterios de aceptación Dado-Cuando-Entonces. |
| **MCPs** | `atlassian` (opcional, para crear HU en Jira) |
| **Skills** | — |
| **Tools** | MCP Atlassian (createJiraIssue) si se solicita crear en Jira |
| **Scripts** | — |
| **Archivos de código** | `.cursor/rules/agent-po-agile-master.mdc` |
| **Archivo de prompt** | No aplica (regla Cursor) |
| **Otra información** | **globs:** `Workspace/plans/**`, `**/docs/**`, `**/*.spec.md`, `**/platforms.json`, `**/prd*.md`, `**/spec*.md`. **alwaysApply: false**. Se activa al trabajar con planes, specs o docs. Proceso Chain-of-Thought obligatorio. Integración con Jira vía platforms.json. |

---

## 7. Doc Updater (Experto en Documentación)

| Campo | Valor |
|-------|-------|
| **Nombre** | Doc Updater |
| **Objetivo** | Mantener la documentación viva. Actualizar `docs/` cuando el código cambia con una solución definitiva. Se activa al editar código o antes de commit. |
| **MCPs** | — |
| **Skills** | `diagramas-drawio` (si se actualizan diagramas) |
| **Tools** | Edición de archivos en `docs/`, `.cursor/README.md` |
| **Scripts** | — |
| **Archivos de código** | `.cursor/rules/agent-doc-updater.mdc`, `.githooks/pre-commit` |
| **Archivo de prompt** | No aplica (regla Cursor) |
| **Otra información** | **globs:** `**/*.{js,ts,tsx,cjs,mjs}`, `scripts/`, `tests/`, `tools/`, `miniverse/`, `docs/**`, `rules/**`. **alwaysApply: false**. **Trigger adicional:** pre-commit hook (`.githooks/pre-commit`) muestra recordatorio cuando hay cambios en código sin cambios en docs. Instalación: `git config core.hooksPath .githooks`. |

---

## 8. Cloud Agent Datadog Alert

| Campo | Valor |
|-------|-------|
| **Nombre** | Cloud Agent Datadog Alert |
| **Objetivo** | Ejecutarse en horario (ej. cada 15 min), obtener alertas de Datadog vía MCP, validar servicios, consultar repos, generar plan y crear/verificar HU en Jira. |
| **MCPs** | `datadog` (search_datadog_monitors, logs, métricas, traces), `atlassian` (searchJiraIssuesUsingJql, createJiraIssue), `github` (get_file_contents, search_code) |
| **Skills** | — |
| **Tools** | MCP Datadog, MCP Atlassian, MCP GitHub |
| **Scripts** | `tools/scripts/create-cursor-automation.js` — crea la automation en cursor.com/automations (Playwright). Comando: `npm run automation:create-cursor` |
| **Archivos de código** | `docs/templates/automation-datadog-alert-prompt.md`, `docs/runbook/automation-datadog-alert.md`, `Workspace/config/platforms.json` (o `PLATFORMS_JSON` env) |
| **Archivo de prompt** | `docs/templates/automation-datadog-alert-prompt.md` |
| **Otra información** | **Trigger:** Scheduled (cursor.com/automations). **No webhook.** Variables de entorno en Cloud Agents: `PLATFORMS_JSON`, `JIRA_CLOUD_ID`, `JIRA_PROJECT_KEY`. Config: `datadog.serviceToRepos`, `github.repos` en platforms.json. Salidas: `Workspace/plans/plan-alerta-{id}.md`, HU en Jira. Runbook: `docs/runbook/automation-datadog-alert.md`. |

---

## Reglas de soporte (no son agentes)

| Regla | Propósito |
|-------|-----------|
| `.cursor/rules/01-plans-location.mdc` | Planes en `Workspace/plans/`, no en `.cursor/plans/` |
| `.cursor/rules/02-onboarding-first-interaction.mdc` | Validar MCPs/CLIs y crear platforms.json si no existe |
| `.cursor/rules/03-validacion-agnostico-particular.mdc` | Validar con usuario si acción es transversal o particular |

---

## Skills disponibles (reutilizables por agentes)

| Skill | Ubicación | Uso |
|-------|-----------|-----|
| **construir** | `.cursor/skills/construir/SKILL.md` | Build, commit, push a producción |
| **prueba** | `.cursor/skills/prueba/SKILL.md` | Playwright E2E, corrección de fallos, reintento |
| **diagramas-drawio** | `.cursor/skills/diagramas-drawio/SKILL.md` | Crear/editar diagramas con MCP drawio |

---

## Diagrama de referencia

| Diagrama | Descripción |
|----------|-------------|
| [equipo-agentes.html](../diagrams/equipo-agentes.html) | Equipo Orquestador → Scout, Historian, Guardian |
| [4-fases-protocolo.html](../diagrams/4-fases-protocolo.html) | 4 fases del protocolo |
| [flujo-automation-datadog-alert.html](../diagrams/flujo-automation-datadog-alert.html) | Cloud Agent Datadog (6 pasos) |

---

## Cómo actualizar un agente

1. **Reglas Cursor (1–7):** Editar el `.mdc` en `.cursor/rules/`.
2. **Cloud Agent (8):** Editar `docs/templates/automation-datadog-alert-prompt.md` y volver a copiar en cursor.com/automations.
3. **MCPs/Skills:** Actualizar este documento y la regla correspondiente.
4. **Nuevo agente:** Añadir entrada en este inventario y crear regla en `.cursor/rules/` o prompt en `docs/templates/`.

---

## Referencias

- [5-agents-functional-architecture.md](./5-agents-functional-architecture.md) — Documento para negocio
- [runbook/automation-datadog-alert.md](../runbook/automation-datadog-alert.md) — Configuración Cloud Agent
- [.cursor/README.md](../../.cursor/README.md) — Índice de reglas Cursor
