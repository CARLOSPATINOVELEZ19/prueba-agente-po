# Plan de Trabajo: Errores de Consola - www.ciencuadras.com

**Fecha de auditoría:** 16 de marzo de 2026  
**Metodología:** Navegación automatizada con Playwright + captura de mensajes de consola  
**Zonas auditadas:** Home, Arriendo, Venta, Inmobiliarias, Constructoras, Blog, Auth, Productos, Remates

---

## Resumen Ejecutivo

| Métrica | Valor |
|---------|-------|
| Errores totales | 11 |
| Warnings totales | 81 |
| Zonas con errores | 5 (Home, Arriendo, Venta, Inmobiliarias, Productos, Remates) |
| Capturas de pantalla | 6 (zonas con errores/warnings) |

**Ubicación del reporte raw:** `audit-output/console-audit-report.json`  
**Capturas:** `audit-output/screenshots/`

---

## Errores Identificados (Priorizados)

### 🔴 P0 - Crítico (Bloquea funcionalidad)

#### HU-01: API de recomendados inaccesible (CORS + 404)
- **Zona:** Home
- **Error:** `Cross-Origin Request Blocked: api-backend.ciencuadras.com/prod/recomendados/api/v1/recientes`
- **Causa:** Endpoint devuelve 404 y no incluye header `Access-Control-Allow-Origin`
- **Impacto:** La sección "inmuebles recientes" no carga; cascada de `ERROR Error` en main.js
- **Abordaje:**
  1. Verificar si el endpoint `/prod/recomendados/api/v1/recientes` existe en el backend
  2. Si está deprecado: eliminar la llamada del frontend o redirigir a endpoint correcto
  3. Si existe: configurar CORS en API Gateway / backend para `www.ciencuadras.com`
  4. Añadir manejo de errores (try/catch) para que un fallo no rompa el render del Home

---

### 🟠 P1 - Alto (Afecta experiencia o analytics)

#### HU-02: Errores genéricos no manejados en resultados de búsqueda
- **Zona:** Arriendo, Venta, Productos, Remates
- **Error:** `ERROR Error` en `result/4788.e5a632d0eb6d42726dd8.js`
- **Causa:** Excepción no capturada en el módulo de resultados (posiblemente relacionada con imágenes, filtros o datos vacíos)
- **Impacto:** Posible degradación de UX; errores silenciosos
- **Abordaje:**
  1. Localizar el chunk 4788 en el build (mapear a componente/servicio)
  2. Añadir error boundaries o try/catch en puntos de fallo
  3. Implementar logging estructurado (Datadog/Sentry) para capturar stack traces
  4. Revisar si hay dependencia con APIs que fallen (ej. recomendados)

#### HU-03: Cookies de terceros rechazadas por dominio inválido
- **Zona:** Inmobiliarias
- **Error:** `Cookie "_fbp" has been rejected for invalid domain` y `"_tt_enable_cookie"`
- **Causa:** Scripts de Facebook Pixel y TikTok intentan setear cookies con dominio incorrecto
- **Impacto:** Tracking de conversiones y remarketing afectado
- **Abordaje:**
  1. Revisar configuración de GTM/scripts de Facebook y TikTok
  2. Asegurar que el dominio de cookie coincida con `ciencuadras.com` (incl. subdominios)
  3. Validar en modo incógnito y con diferentes navegadores

#### HU-04: CORS fallido en Taboola (publicidad)
- **Zona:** Inmobiliarias, Constructoras, Productos
- **Error:** `Cross-Origin Request Blocked: cds.taboola.com`
- **Causa:** Script de Taboola hace requests que fallan por CORS
- **Impacto:** Widget de contenido patrocinado puede no cargar correctamente
- **Abordaje:**
  1. Contactar soporte Taboola o revisar documentación de integración
  2. Cargar script de forma asíncrona/defer para no bloquear
  3. Considerar envolver en try/catch para degradación elegante

---

### 🟡 P2 - Medio (Performance / UX secundaria)

#### HU-05: Preload de imágenes ignorado
- **Zona:** Arriendo, Venta, Productos
- **Error:** `Preload of https://images.ciencuadras.com/... was ignored due to unknown "as" or "type" values`
- **Causa:** Etiquetas `<link rel="preload">` sin atributo `as="image"` o `type` incorrecto
- **Impacto:** LCP (Largest Contentful Paint) puede degradarse; imágenes no se precargan
- **Abordaje:**
  1. Auditar componentes que generan preload (listados de inmuebles)
  2. Añadir `as="image"` y `type="image/jpeg"` (o el tipo correcto)
  3. Validar con Lighthouse

#### HU-06: Fuente con glyph bbox incorrecto
- **Zona:** Home
- **Error:** `downloadable font: Glyph bbox was incorrect (font-family: "ciencuadras")`
- **Causa:** Archivo WOFF con métricas incorrectas en ciertos glifos
- **Impacto:** Posible renderizado visual incorrecto en iconos/texto
- **Abordaje:**
  1. Regenerar fuente con herramienta (fontforge, glyphr) corrigiendo bbox
  2. O reemplazar por SVG/icon font alternativo

#### HU-07: PerformanceObserver con entryTypes no soportados
- **Zona:** Home
- **Error:** `Ignoring unsupported entryTypes: layout-shift` y `longtask`
- **Causa:** Firefox (y algunos navegadores) no soportan estos tipos en PerformanceObserver
- **Impacto:** Bajo; métricas de Core Web Vitals pueden no capturarse en Firefox
- **Abordaje:**
  1. Verificar soporte antes de observar: `PerformanceObserver.supportedEntryTypes`
  2. Usar polyfill o degradación silenciosa

#### HU-08: Error no capturado en Host Listener (menú privado)
- **Zona:** Home
- **Error:** `UNCAUGTHER ERROR HOST LISTENER PRIVATE MENU`
- **Causa:** Bug en componente de menú (posible acceso a propiedad undefined)
- **Impacto:** Menú de usuario autenticado puede fallar en ciertos estados
- **Abordaje:**
  1. Buscar "PRIVATE MENU" o "HOST LISTENER" en código
  2. Añadir validaciones null/undefined
  3. Envolver en try/catch con logging

---

### 🟢 P3 - Bajo (Mejora continua)

#### HU-09: Timeouts en carga de páginas
- **Zona:** Inmobiliarias, Blog, Auth
- **Error:** `page.goto: Timeout 30000ms exceeded` (networkidle)
- **Causa:** Páginas con requests prolongados o polling que impiden "networkidle"
- **Impacto:** Experiencia de carga lenta percibida
- **Abordaje:**
  1. Revisar si hay polling infinito o websockets que no se cierran
  2. Optimizar llamadas a APIs en estas rutas
  3. Considerar lazy loading de scripts de terceros

---

## Plan de Ejecución Sugerido

| Fase | HUs | Esfuerzo estimado |
|------|-----|-------------------|
| **Fase 1 - Críticos** | HU-01 | 2-3 días |
| **Fase 2 - Altos** | HU-02, HU-03, HU-04 | 3-5 días |
| **Fase 3 - Medios** | HU-05, HU-06, HU-07, HU-08 | 2-4 días |
| **Fase 4 - Bajos** | HU-09 | 1-2 días |

---

## Capturas de Pantalla (Referencia)

Las siguientes capturas se tomaron en zonas con errores/warnings:

| Zona | Archivo |
|------|---------|
| Home | `audit-output/screenshots/home-1773696763159.png` |
| Arriendo | `audit-output/screenshots/arriendo-1773696769789.png` |
| Venta | `audit-output/screenshots/venta-1773696775573.png` |
| Constructoras | `audit-output/screenshots/constructoras-1773696811126.png` |
| Productos | `audit-output/screenshots/productos-1773696876802.png` |
| Remates | `audit-output/screenshots/remates-1773696881487.png` |

---

## Notas

- **No se han creado tickets en Jira** según lo solicitado.
- Para reproducir la auditoría: `node scripts/audit-console-errors.js`
- Se recomienda ejecutar validación con Playwright (Guardian Agent) tras cada fix.
