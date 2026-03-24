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

## Referencias

- [Playwright MCP - GitHub](https://github.com/microsoft/playwright-mcp)
