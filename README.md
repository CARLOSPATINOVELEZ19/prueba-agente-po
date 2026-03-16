# prueba-agente-po

Workspace de pruebas E2E y auditoría para el ecosistema Ciencuadras (Seguros Bolívar).

## Estructura

```
prueba-agente-po/
├── tests/                    # Tests E2E con Playwright
├── scripts/                  # Scripts de auditoría y utilidades
│   └── audit-console-errors.js
├── audit-output/             # Reportes de auditoría (generados)
├── docs/                     # Documentación
│   └── observabilidad-ciencuadras/
├── ciencuadras-repos/        # Repositorios embebidos
│   ├── ciencuadras-portal-frontend/
│   ├── ciencuadras-monorepo-mf/
│   └── ...
└── .cursor/                  # Reglas y planes para agentes
```

## Comandos

| Comando          | Descripción                                        |
| ---------------- | -------------------------------------------------- |
| `npm test`       | Ejecuta tests E2E con Playwright                   |
| `npm run audit`  | Auditoría de errores de consola en ciencuadras.com |
| `npm run lint`   | Ejecuta ESLint                                     |
| `npm run format` | Formatea código con Prettier                       |

## Requisitos

- Node.js 18+
- `npm install`
- `npx playwright install` (primera vez, para descargar navegadores)

## Ecosistema

- **Gestión:** Jira (MCP atlassian)
- **Monitoreo:** Datadog (MCP datadog)
- **Tests:** Playwright para E2E

Ver [tech-stack.md](./tech-stack.md) para más detalles.
