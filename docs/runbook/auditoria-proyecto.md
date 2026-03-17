# Runbook: Auditoría del proyecto

## Auditoría de errores de consola

El script `scripts/audit-console-errors.js` navega por las zonas configuradas en `Workspace/config/platforms.json` (auditZones) y captura errores, warnings y logs de la consola del navegador.

### Ejecución

```bash
npm run audit
```

### Salida

- `Workspace/audit/console-audit-report.json` — Reporte estructurado
- `Workspace/audit/screenshots/` — Capturas por zona

### Zonas auditadas

Definidas en `Workspace/config/platforms.json` → `auditZones`. Ver plantilla en `docs/templates/platforms.example.json`.

### Interpretación

- Revisar `summary.errors` y `summary.warnings` en el JSON
- Priorizar errores que afecten conversión o UX
- Las capturas ayudan a correlacionar errores con pantallas específicas

### Integración con CI

Para ejecutar en CI y fallar si hay errores críticos, se puede extender el script para que retorne código de salida distinto de 0 cuando `summary.errors > N`.
