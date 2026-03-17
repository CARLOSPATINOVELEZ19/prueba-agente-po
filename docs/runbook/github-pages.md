# Runbook: Publicar en GitHub Pages

Los reportes HTML en `docs/` se publican en GitHub Pages para acceso desde la web.

## URL del sitio

- **Repositorio prueba-agente-po:**  
  `https://carlospatinovelez19.github.io/prueba-agente-po/`

- **Repositorio carlospatinovelez19.github.io (si se usa como sitio principal):**  
  `https://carlospatinovelez19.github.io/`

## Configuración en GitHub

1. **Settings** → **Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` (o la rama principal)
4. **Folder:** `/docs`
5. Guardar

## Reportes disponibles

| Reporte | URL relativa |
|---------|--------------|
| Inicio | `index.html` |
| Índice de reportes | `reportes.html` |
| Análisis ciclo de desarrollo | `analisis-ciclo-desarrollo.html` |
| Auditoría errores consola | `auditoria-errores-consola-ciencuadras.html` |

## Regenerar reporte de ciclo de desarrollo

```bash
npm run report:cycle
```

Requiere `docs/data/jira-cycle-2025.json` (exportado desde Jira con los campos de tiempo).
