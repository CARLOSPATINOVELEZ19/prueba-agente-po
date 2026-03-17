# Documentación del proyecto prueba-agente-po

> **Archivo de contexto principal para IA:** [resumen-proyecto.md](./resumen-proyecto.md)

---

## Índice

### Contexto y arquitectura

| Documento | Descripción |
|----------|-------------|
| [resumen-proyecto.md](./resumen-proyecto.md) | Contexto principal: stack, patrones, reglas, estructura |
| [architecture/0-overview.md](./architecture/0-overview.md) | Visión general y estado del código |
| [architecture/1-stack.md](./architecture/1-stack.md) | Tecnologías y versiones |
| [architecture/4-workspace.md](./architecture/4-workspace.md) | Estructura del Workspace (resultados de agentes) |
| [tech-stack.md](./tech-stack.md) | Ecosistema tecnológico de la organización |

### Onboarding

| Documento | Descripción |
|----------|-------------|
| [onboarding/01-flujo-primera-interaccion.md](./onboarding/01-flujo-primera-interaccion.md) | Flujo de primera interacción: validar MCPs/CLIs y crear platforms.json |

### Runbooks

| Runbook | Descripción |
|---------|-------------|
| [runbook/levantar-entorno-local.md](./runbook/levantar-entorno-local.md) | Cómo levantar el entorno local |
| [runbook/auditoria-proyecto.md](./runbook/auditoria-proyecto.md) | Cómo auditar el proyecto (errores de consola) |
| [runbook/github-pages.md](./runbook/github-pages.md) | Cómo publicar reportes en GitHub Pages |
| [runbook/migraciones.md](./runbook/migraciones.md) | Migraciones (placeholder; no aplica actualmente) |

### Decisiones técnicas (ADRs)

| Archivo | Título |
|---------|--------|
| [decisions/003-playwright-e2e.md](./decisions/003-playwright-e2e.md) | Por qué Playwright para E2E |

### Plantillas y datos

| Recurso | Uso |
|---------|-----|
| [templates/platforms.example.json](./templates/platforms.example.json) | Plantilla para `Workspace/config/platforms.json` |
| [data/jira-cycle-2025.json](./data/jira-cycle-2025.json) | Datos de referencia para reportes de ciclo |

### Otros

| Documento | Descripción |
|----------|-------------|
| [design-system.md](./design-system.md) | Sistema de diseño (tipografías, paleta, componentes) |
| [analisis/ANALISIS_LIMPIEZA_PROYECTO.md](./analisis/ANALISIS_LIMPIEZA_PROYECTO.md) | Análisis histórico de limpieza (proyecto agnóstico) |

---

## Reportes HTML (GitHub Pages)

Los reportes publicados en `docs/` se sirven desde GitHub Pages. Ver [runbook/github-pages.md](./runbook/github-pages.md) para el flujo de publicación.
