# Configuración de Playwright MCP (opcional)

> Playwright MCP permite que el agente controle un navegador en tiempo real durante la conversación. Es **complementario** a Playwright Test (CLI); no lo sustituye.

## Cuándo usar cada uno

| Caso | Usar | Motivo |
|------|------|--------|
| Smoke tests, regresión, CI | `npm test` (Playwright Test) | Tests deterministas, versionados, eficientes en tokens |
| Explorar una página concreta | Playwright MCP | Interacción iterativa, snapshot de accesibilidad |
| Verificar ad hoc sin escribir test | Playwright MCP | El agente navega y verifica en la conversación |

## Cómo añadir Playwright MCP en Cursor

1. Abrir **Cursor Settings** → **MCP** → **Add new MCP Server**
2. Nombre: `playwright` (o el que prefieras)
3. Tipo: `command`
4. Comando: `npx @playwright/mcp@latest`

O añadir manualmente en la configuración MCP de Cursor:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

## Requisitos

- Node.js 18+
- `npx` disponible (viene con Node.js)
- Primera ejecución descargará `@playwright/mcp` si no está en caché

## Validación (opcional en onboarding)

Para comprobar que Playwright MCP está operativo:

- Probar una herramienta como `browser_navigate` o `browser_snapshot` en una conversación
- O verificar que el servidor MCP "playwright" aparece en la lista de MCPs de Cursor

## Chrome DevTools MCP (solo flujo E2E en este repo)

En **prueba-agente-po**, el servidor [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) está declarado en **`.cursor/mcp.json`** (nivel proyecto). Cursor **fusiona** esa entrada con tu configuración MCP global; así el servidor queda activo **solo al abrir este workspace**, no en el resto de proyectos (salvo que repitas el mismo archivo en otros repos).

**Política de agentes:** solo el **Guardian** y la skill **`prueba`** deben usar sus herramientas (rendimiento, Lighthouse, red, consola). El criterio de éxito sigue siendo Playwright por CLI (`npm test`). Detalle: `agent-tech-guardian.mdc`, `04-playwright-cli-vs-mcp.mdc`, `00-swarm-orchestrator.mdc`.

## Microsoft Clarity MCP (opcional)

El servidor oficial [microsoft/clarity-mcp-server](https://github.com/microsoft/clarity-mcp-server) expone analítica de Clarity, listado de grabaciones de sesión y consultas a la documentación. En este proyecto lo usa el agente **Clarity Behavior** (inventario #9, regla `agent-clarity-behavior.mdc`); el Orquestador lo activa con Task `generalPurpose` y metadato `[miniverse:clarity-behavior]`.

**Token:** en el proyecto Clarity → **Settings → Data Export → Generate new API token**. No versiones el token: pásalo en argumentos del servidor MCP o en variables de entorno que configure tu entorno local.

Ejemplo de entrada para Cursor (fusionar con tu `.cursor/mcp.json` global o del repo; usar un placeholder, no un secreto real):

```json
{
  "mcpServers": {
    "clarity": {
      "command": "npx",
      "args": ["-y", "@microsoft/clarity-mcp-server", "--clarity_api_token=REEMPLAZAR_CON_TOKEN"]
    }
  }
}
```

Equivalente en terminal: `npx @microsoft/clarity-mcp-server --clarity_api_token=TU_TOKEN`.

Ejemplo de entrada (ya versionada en el repo):

```json
{
  "mcpServers": {
    "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest", "--no-usage-statistics"]
    }
  }
}
```

## Referencias

- [Playwright MCP - GitHub](https://github.com/microsoft/playwright-mcp)
- [Chrome DevTools MCP - GitHub](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- [Microsoft Clarity MCP Server - GitHub](https://github.com/microsoft/clarity-mcp-server)
