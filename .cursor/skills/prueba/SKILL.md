---
name: prueba-ui
description: Abre el navegador, comprueba el funcionamiento de la interfaz de usuario recién creada o modificada, y si falla, corrige los errores y vuelve a intentar automáticamente. Usa Playwright Test (CLI) para tests E2E; Playwright MCP para exploración interactiva cuando esté disponible.
---

# Skill de Prueba de UI

## Objetivo

Verificar que la interfaz de usuario funciona correctamente tras cambios recientes. Si hay fallos, corregirlos y reintentar hasta que pase.

## Instrucciones

### 1. Identificar qué probar

- **Smoke tests**: Tests E2E agnósticos en `tests/smoke.spec.js` (baseURL y rutas desde `Workspace/config/platforms.json`)
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

1. Revisar el output de Playwright (trace, screenshot en `Workspace/playwright/test-results/`)
2. Identificar la causa del fallo
3. Corregir el código
4. **Volver al paso 2** y ejecutar los tests de nuevo
5. Repetir hasta que todos pasen

### 4. Playwright MCP (opcional, si está configurado)

Si Playwright MCP está disponible en Cursor (ver `docs/onboarding/02-playwright-mcp-config.md`):
- Usa `browser_navigate`, `browser_snapshot` para explorar una página concreta
- Útil para verificación ad hoc sin escribir un test
- **Prioriza** `npm test` para smoke tests conocidos; MCP para exploración interactiva

### 5. Criterio de éxito

- Todos los tests de Playwright pasan
- No hay errores críticos en consola (si se audita con `npm run audit`)

## Checklist

- [ ] `npm test` ejecutado
- [ ] Fallos corregidos y tests re-ejecutados
- [ ] Resultado final: todos los tests pasan
