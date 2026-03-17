# Flujo de Primera Interacción

> Este flujo debe ejecutarse cuando el agente interactúa por primera vez con el proyecto o cuando no existe `Workspace/config/platforms.json`.

## Objetivo

Validar el entorno y capturar la configuración de plataformas para que el proyecto sea **agnóstico** y funcione con cualquier producto.

---

## Paso 1: Validar configuración de MCPs y CLIs

### MCPs requeridos por Skills

| MCP | Uso | Validación |
|-----|-----|------------|
| **atlassian** | Jira, Confluence (tickets, backlogs, triage) | Probar `getVisibleJiraProjects` o `getAccessibleAtlassianResources` |
| **datadog** | Logs, métricas, dashboards, incidentes | Ver skill `datadog-mcp-setup`: revisar que `mcp.json` no tenga `${DD_MCP_DOMAIN}` |
| **github** | PRs, issues, `gh pr list` | Probar `list_pull_requests` o verificar que `gh` CLI esté instalado |

### CLIs requeridos

| CLI | Uso | Comando de validación |
|-----|-----|------------------------|
| `gh` | GitHub (PRs, ramas) | `gh auth status` |
| `node` | Tests, scripts | `node --version` (18+) |
| `npm` | Dependencias, scripts | `npm --version` |
| `npx playwright` | E2E, auditoría | `npx playwright --version` |

### Acciones

1. Para **Datadog**: leer `datadog-mcp-setup` skill. Si `mcp.json` tiene `${DD_MCP_DOMAIN}`, pedir al usuario el dominio (us1, us3, us5, eu1, ap1, ap2).
2. Para **Atlassian**: intentar una llamada de prueba. Si falla, indicar que revise credenciales/OAuth.
3. Para **CLIs**: ejecutar los comandos de validación y reportar qué falta.

---

## Paso 2: Identificar plataformas a trabajar

Si no existe `Workspace/config/platforms.json`, crearlo a partir de `docs/templates/platforms.example.json` y solicitar al usuario:

### Datos a capturar por plataforma

| Dato | Descripción | Ejemplo |
|------|-------------|---------|
| **URLs** | App principal, staging, docs | `https://www.ciencuadras.com` |
| **Jira - Proyecto** | Clave del proyecto, URL | `CC`, `https://bolivar.atlassian.net/browse/CC` |
| **Jira - Tablero de incidentes** | ID o URL del board | `123` |
| **Jira - Tablero de incidentes de seguridad** | ID o URL del board | `456` |
| **Datadog** | Site, IDs de dashboards relevantes | `us1`, `[12345, 67890]` |

### Formato de salida

El archivo `Workspace/config/platforms.json` debe seguir la estructura de la plantilla. Puede haber varias plataformas; `defaultPlatformId` indica cuál usar por defecto.

---

## Checklist de onboarding completado

- [ ] MCP Atlassian: validado
- [ ] MCP Datadog: configurado (dominio sin placeholder)
- [ ] MCP GitHub: validado
- [ ] CLI `gh`: instalado y autenticado
- [ ] CLI `node` 18+: instalado
- [ ] CLI `npx playwright`: instalado
- [ ] `Workspace/config/platforms.json` creado con al menos una plataforma
- [ ] URLs, Jira y Datadog definidos para la plataforma por defecto

---

## Referencias

- Plantilla: `docs/templates/platforms.example.json`
- Skill Datadog: `.cursor/plugins/.../datadog-mcp-setup/SKILL.md`
- Estructura Workspace: `docs/architecture/4-workspace.md`
