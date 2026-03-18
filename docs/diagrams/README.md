# Diagramas del proyecto

> Los diagramas están embebidos en los documentos fuente como **Mermaid**. Este directorio contiene la fuente persistente y los enlaces para abrir en Draw.io.

## Persistencia

Los diagramas persisten en `docs/diagrams/` de dos formas:

| Formato | Archivo | Uso |
|---------|---------|-----|
| **Mermaid** | `*.mmd` | Fuente de verdad, versionable; copiar/pegar en Draw.io para editar |
| **HTML** | `*.html` | Enlace corto que redirige a Draw.io con el diagrama precargado |

Para editar y guardar cambios: abre el `.html`, en Draw.io usa **File → Save as** y guarda como `.drawio` en este directorio si quieres persistir la versión gráfica.

## Archivos persistentes

| Fuente (.mmd) | Enlace (.html) | Descripción |
|---------------|----------------|-------------|
| [flujo-estructura.mmd](./flujo-estructura.mmd) | [flujo-estructura.html](./flujo-estructura.html) | Flujos de configuración, E2E, auditoría, reportes y agentes |
| [flujo-onboarding.mmd](./flujo-onboarding.mmd) | [flujo-onboarding.html](./flujo-onboarding.html) | Flujo de onboarding (validación → platforms.json) |
| [flujo-workspace.mmd](./flujo-workspace.mmd) | [flujo-workspace.html](./flujo-workspace.html) | Generadores → Workspace → deploy |
| [flujo-github-pages.mmd](./flujo-github-pages.mmd) | [flujo-github-pages.html](./flujo-github-pages.html) | Flujo deploy:pages → GitHub Pages |
| [codigo-vs-artefactos.mmd](./codigo-vs-artefactos.mmd) | [codigo-vs-artefactos.html](./codigo-vs-artefactos.html) | Separación código vs artefactos |
| [equipo-agentes.mmd](./equipo-agentes.mmd) | [equipo-agentes.html](./equipo-agentes.html) | Equipo de agentes (Scout, Historian, Guardian) |
| [4-fases-protocolo.mmd](./4-fases-protocolo.mmd) | [4-fases-protocolo.html](./4-fases-protocolo.html) | 4 fases del protocolo (Análisis → Validación) |

## Ubicación en documentos

| Documento | Enlace |
|-----------|--------|
| `../ESTRUCTURA.md` | `diagrams/flujo-estructura.html` |
| `../onboarding/01-flujo-primera-interaccion.md` | `diagrams/flujo-onboarding.html` |
| `../architecture/4-workspace.md` | `diagrams/flujo-workspace.html` |
| `../architecture/0-overview.md` | `diagrams/codigo-vs-artefactos.html` |
| `../architecture/5-agents-functional-architecture.md` | `diagrams/equipo-agentes.html`, `diagrams/4-fases-protocolo.html` |
| `../runbook/github-pages.md` | `diagrams/flujo-github-pages.html` |

## Cómo editar en Draw.io

1. **Enlace corto:** Cada documento incluye una nota con el enlace **[Abrir en Draw.io]** que apunta a un archivo HTML con nombre descriptivo (ej. `flujo-workspace.html`). La página redirige automáticamente a Draw.io con el diagrama.
2. **Desde Cursor:** Pide al agente que use el skill `diagramas-drawio` o el MCP `drawio-mcp` con el contenido Mermaid del documento.
3. **Manual:** Copia el bloque Mermaid del `.md` y pégalo en [diagrams.net](https://app.diagrams.net/) → Arrange → Insert → Advanced → Mermaid.
4. **Exportar:** File → Export as → .drawio para guardar en este directorio si lo deseas.
