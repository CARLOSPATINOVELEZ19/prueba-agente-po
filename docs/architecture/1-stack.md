# Stack Tecnológico

## Lineamientos

- **Runtime:** Node.js 18+ en todo el proyecto
- **Raíz:** JavaScript (CJS) para tests, scripts y herramientas
- **Testing:** Playwright para E2E; Vitest para unitarios
- **Calidad:** ESLint + Prettier
- **Separación:** Código fuente versionado vs artefactos en `Workspace/` (`.gitignore`)

## Runtime y lenguaje

| Tecnología | Versión | Notas |
|------------|---------|-------|
| Node.js | 18+ | Requerido para scripts y tests |
| JavaScript (CJS) | - | Raíz: `"type": "commonjs"` (tests, scripts) |

## Testing y calidad

| Herramienta | Versión | Uso |
|-------------|---------|-----|
| @playwright/test | ^1.58.2 | Tests E2E (raíz) |
| vitest | ^4.1.0 | Tests unitarios (tests/unit/**/*.test.js) |
| supertest | ^7.2.2 | Tests de API (disponible, no usado aún) |
| eslint | ^8.57.0 | Linting |
| eslint-config-prettier | ^9.1.0 | Integración Prettier |
| prettier | ^3.3.0 | Formateo |

## Infraestructura

| Herramienta | Uso |
|-------------|-----|
| Playwright | Navegadores para E2E y auditoría de consola |

## Subproyectos

### Miniverse (`miniverse/`)

Mundo de píxeles compartido para agentes IA. Stack extendido (submódulo independiente):

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Node.js | 18+ | Runtime (alineado con raíz) |
| TypeScript | ~5.9 | Tipado en frontend y servidor |
| Vite | ^8.0 | Build y dev del frontend |
| Express | ^5.2 | API REST y servidor estático |
| ws | ^8.19 | WebSocket tiempo real |

**Lineamientos aplicados:**

- Planes en `Workspace/plans/` (ej. `miniverse-plan.md`)
- Comunicación agnóstica: API HTTP/WS sin hardcodear plataformas
- Estilo visual: `image-rendering: pixelated` (Pixel Art); colores alineados con [2-design-system.md](./2-design-system.md)
- Validación: tests E2E en `tests/miniverse.spec.js` (`npx playwright test --project=miniverse`)
