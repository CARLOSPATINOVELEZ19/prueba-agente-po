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

| Reporte | URL relativa | Estado |
|---------|--------------|--------|
| Inicio (Reporte Ejecutivo Entregables) | `index.html` | ✅ Publicado |
| Índice de reportes | `reportes.html` | ✅ Publicado |
| Reporte Ejecutivo standalone | `reporte-ejecutivo-valor-proyecto.html` | ✅ Publicado |
| Análisis ciclo de desarrollo | `analisis-ciclo-desarrollo.html` | ✅ Generado por `deploy:pages` |
| Auditoría errores consola | `auditoria-errores-consola.html` | ⏳ Pendiente (no hay generador HTML) |
| Reporte Ciencuadras | `reporte-ciencuadras-marzo-2026.html` | ⏳ Pendiente (no existe) |

**Importante:** No añadir enlaces en `reportes.html` ni `index.html` a páginas que no existan en `docs/`, para evitar 404 en GitHub Pages.

## Plantillas (docs/Asset/)

Las plantillas CSS y HTML para reportes están en `docs/Asset/`:
- `report-base.css` — variables y layout base
- `report-components.css` — componentes (cards, tablas, badges, footer)
- `report-index.css` — estilos del índice de reportes
- `template-report.html` / `template-report-index.html` — plantillas HTML de referencia

## Staging y rutas Asset

Los reportes se generan en `Workspace/reports/` (área de staging, no versionada). Los HTML usan rutas relativas:

```html
<link rel="stylesheet" href="Asset/report-base.css">
<link rel="stylesheet" href="Asset/report-components.css">
```

- **En Workspace/reports/**: La ruta `Asset/` no resuelve (no existe `Workspace/reports/Asset/`). El reporte no mostrará estilos si se abre localmente desde ahí.
- **En docs/**: La ruta `Asset/` resuelve a `docs/Asset/` correctamente. GitHub Pages sirve `docs/`, por lo que los estilos cargan bien.

**Importante:** `deploy:pages` es el paso obligatorio antes de commit. Sin ejecutarlo, los reportes en `docs/` quedarían desactualizados y GitHub Pages no mostraría los estilos correctamente para los reportes generados.

## Flujo de publicación (deploy:pages)

Los reportes se generan en `Workspace/reports/` (no versionado). Para publicarlos en GitHub Pages:

1. **Regenerar y copiar a docs:**

   ```bash
   npm run deploy:pages
   ```

   Este comando ejecuta `report:cycle` y copia los HTML generados a `docs/`.

2. **Commit y push:**

   ```bash
   git add docs/
   git commit -m "Actualizar reportes para GitHub Pages"
   git push
   ```

## Regenerar reporte de ciclo de desarrollo (solo local)

```bash
npm run report:cycle
```

Genera en `Workspace/reports/`. Requiere `docs/data/jira-cycle-2025.json` (exportado desde Jira con los campos de tiempo).
