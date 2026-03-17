# Runbook: Levantar entorno local

## Requisitos previos

- Node.js 18+
- `npm install` en la raíz
- `npx playwright install` (primera vez)

## Pasos

### 1. Instalar dependencias

```bash
# Raíz (Playwright, ESLint, Prettier)
npm install

# Playwright browsers (primera vez)
npx playwright install
```

### 2. Ejecutar tests E2E (Ciencuadras)

```bash
npm test
```

Los tests usan `baseURL: https://www.ciencuadras.com` (ver `playwright.config.js`).

### 3. Auditoría de consola

```bash
npm run audit
```

Genera reporte en `Workspace/audit/console-audit-report.json`.

---

## Portal AgentCrew (estado incompleto)

El servidor `portal/server` tiene un `index.js` que importa módulos no implementados (`triggers/`, `config/`, `agents/`). **No arranca** hasta que existan esos archivos.

Cuando estén implementados:

1. Instalar: `cd portal/server && npm install`
2. Levantar NATS (Docker o `nats-server` local)
3. Iniciar: `npm start`
4. Verificar: `curl http://localhost:3003/health`

No hay `docker-compose.yml` en el repo; NATS debe levantarse manualmente (ej. `brew install nats-server && nats-server`).

## Troubleshooting

| Problema | Solución |
|----------|----------|
| Playwright no encuentra navegadores | `npx playwright install` |
| Tests fallan por timeout | Verificar conectividad a ciencuadras.com |
