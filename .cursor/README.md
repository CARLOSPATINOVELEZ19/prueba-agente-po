# Configuración de Cursor para prueba-agente-po

> Índice de la carpeta `.cursor` y su lógica de uso.

---

## Estructura

```
.cursor/
├── README.md           # Este índice
├── rules/              # Reglas aplicadas por la IA
│   ├── 00-swarm-orchestrator.mdc   # Orquestador (siempre activa)
│   ├── 01-plans-location.mdc       # Planes en Workspace/plans/
│   ├── 02-onboarding-first-interaction.mdc
│   ├── agent-tech-guardian.mdc     # QA/Playwright (globs: tests)
│   ├── agent-github-repos.mdc      # Lectura de repos GitHub de la plataforma
│   ├── agent-po-agile-master.mdc   # PO: Historias de Usuario para Jira (INVEST)
│   └── agent-doc-updater.mdc       # Experto en documentación (globs: código, docs)
├── skills/             # Skills especializados (construir, prueba)
│   ├── construir/      # Build y deploy
│   └── prueba/         # Tests E2E y validación UI
└── plans/              # Redirige a Workspace/plans/ (no usar aquí)
```

---

## Lógica de reglas

| Regla | alwaysApply | Globs | Propósito |
|-------|-------------|-------|-----------|
| 00-swarm-orchestrator | Sí | * | Orquestador: análisis Jira, planificación, validación Playwright |
| 01-plans-location | Sí | * | Planes en `Workspace/plans/`, no en `.cursor/plans/` |
| 02-onboarding-first-interaction | Sí | * | Validar MCPs/CLIs y crear platforms.json si no existe |
| agent-tech-guardian | No | tests, playwright.config | QA: self-healing de tests, cobertura mínima |
| agent-github-repos | No | platforms.json, plans | Lectura de repos GitHub de la plataforma (MCP + gh) |
| agent-po-agile-master | No | plans, docs, specs | PO: transformar requisitos en HU para Jira (INVEST, AC) |
| agent-doc-updater | No | código, docs, rules | Actualizar docs cuando código cambia (pre-commit reminder) |

---

## Skills disponibles

| Skill | Uso |
|-------|-----|
| **construir** | Build, commit, push a producción |
| **prueba** | Ejecutar Playwright, corregir fallos y reintentar |

---

## Distinción de reglas

- **`.cursor/rules/`**: Reglas de orquestación y flujo (Cursor).
- **`rules/`** (raíz): Reglas técnicas del proyecto (Playwright, Datadog, PRD, AGENTS.md).

---

## Referencias

- Reglas raíz: `.cursorrules` (lee `docs/resumen-proyecto.md`)
- Estructura del proyecto: `docs/ESTRUCTURA.md`
- Onboarding: `docs/onboarding/01-flujo-primera-interaccion.md`
- **Inventario de agentes:** `docs/architecture/6-inventario-agentes.md` — MCPs, skills, archivos, prompt por agente
