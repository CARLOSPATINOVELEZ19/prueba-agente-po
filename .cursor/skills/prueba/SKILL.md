---
name: prueba-ui
description: Abre el navegador, comprueba el funcionamiento de la interfaz de usuario recién creada o modificada, y si falla, corrige los errores y vuelve a intentar automáticamente. Usa Playwright Test (CLI) para tests E2E; Playwright MCP para exploración interactiva; Chrome DevTools MCP solo en este flujo E2E (`.cursor/mcp.json`) para rendimiento y depuración profunda.
---

# Skill de Prueba de UI

## Objetivo

Verificar que la interfaz de usuario funciona correctamente tras cambios recientes. Si hay fallos, corregirlos y reintentar hasta que pase.

## Instrucciones

### 1. Identificar qué probar

- **Smoke tests**: Tests E2E agnósticos en `tests/smoke.spec.js` (baseURL y rutas desde `WORKSPACE_ROOT/config/platforms.json`; por defecto `Workspace/ciencuadras/config/platforms.json`)
- **UI específica**: Si se creó o modificó una página, ejecutar tests que la cubran

### 2. Ejecutar tests con Playwright

```bash
npm test
```

O con UI interactiva:
```bash
npm run test:ui
```

### 3. Si falla

1. Revisar el output de Playwright (trace, screenshot en `{WORKSPACE_ROOT}/playwright/test-results/`; sin `WORKSPACE_ROOT`, `Workspace/playwright/`)
2. Identificar la causa del fallo
3. Corregir el código
4. **Volver al paso 2** y ejecutar los tests de nuevo
5. Repetir hasta que todos pasen

### 4. Playwright MCP (opcional, si está configurado)

Si Playwright MCP está disponible en Cursor (ver `docs/onboarding/02-playwright-mcp-config.md`):
- Usa `browser_navigate`, `browser_snapshot` para explorar una página concreta
- Útil para verificación ad hoc sin escribir un test
- **Prioriza** `npm test` para smoke tests conocidos; MCP para exploración interactiva

### 5. Chrome DevTools MCP (este workspace, solo E2E)

Si está activo (`.cursor/mcp.json` del proyecto + [chrome-devtools-mcp](https://github.com/ChromeDevTools/chrome-devtools-mcp)):
- Úsalo **solo** dentro de esta skill / agente Guardian: trazas de rendimiento, Lighthouse, red, consola, capturas cuando Playwright no basta para diagnosticar.
- **No** sustituye el criterio de éxito: sigue cerrando con `npm test` pasando.
- Otros agentes del enjambre no deben invocar estas herramientas (política en `agent-tech-guardian.mdc` y `00-swarm-orchestrator.mdc`).

### 6. Criterio de éxito

- Todos los tests de Playwright pasan
- No hay errores críticos en consola (si se audita con `npm run audit`)

## Checklist

- [ ] `npm test` ejecutado
- [ ] Fallos corregidos y tests re-ejecutados
- [ ] Resultado final: todos los tests pasan
