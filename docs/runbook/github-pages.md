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
