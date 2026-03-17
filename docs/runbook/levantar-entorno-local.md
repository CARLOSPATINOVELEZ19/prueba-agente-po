# Runbook: Levantar entorno local

## Requisitos previos

- Node.js 18+
- `npm install` en la raíz
- `npx playwright install` (primera vez)
- **Configuración**: `Workspace/config/platforms.json` (ver [onboarding](../onboarding/01-flujo-primera-interaccion.md) si no existe)

## Pasos

### 1. Instalar dependencias

```bash
# Raíz (Playwright, ESLint, Prettier, Vitest)
npm install

# Playwright browsers (primera vez)
npx playwright install
```

### 2. Ejecutar tests E2E

```bash
npm test
```

Los tests usan `baseURL` y `smokePaths` desde `Workspace/config/platforms.json` (o `BASE_URL` si no hay config). Ver `playwright.config.js` y `scripts/get-platform-config.js`.

### 3. Tests unitarios

```bash
npm run test:unit
```

Ejecuta Vitest sobre `tests/unit/**/*.test.js` (audit-data, helpers).

### 4. Auditoría de consola

```bash
npm run audit
```

Genera reporte en `Workspace/audit/console-audit-report.json` y capturas en `Workspace/audit/screenshots/`. URL y zonas desde config.

## Troubleshooting

| Problema | Solución |
|----------|----------|
| Playwright no encuentra navegadores | `npx playwright install` |
| Tests fallan por timeout | Verificar conectividad a la URL configurada en platforms.json |
| "baseURL" o "smokePaths" undefined | Crear `Workspace/config/platforms.json` desde `docs/templates/platforms.example.json` |
