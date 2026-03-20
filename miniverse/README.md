# Miniverse (upstream)

Mundo pixel art para agentes IA, basado en el proyecto open source **[ianscott313/miniverse](https://github.com/ianscott313/miniverse)** (paquetes npm `@miniverse/core` y `@miniverse/server`).

## Requisitos

- Node.js 18+

## Desarrollo

```bash
cd miniverse
npm install
npm run dev
```

Levanta:

- **Vite** (interfaz): [http://localhost:5173](http://localhost:5173)
- **API / WebSocket** (`miniverse --no-browser`): [http://localhost:4321](http://localhost:4321)

El alias `npm run dev:full` es equivalente a `npm run dev`.

## API para agentes

Misma API que documenta el upstream: `POST /api/heartbeat`, `POST /api/act`, `GET /api/agents`, `GET /api/inbox`, etc. Ver el [README del repositorio](https://github.com/ianscott313/miniverse#readme).

## Claude Code

Copia `.claude/settings.json.example` a la carpeta `.claude` del repo (o del proyecto donde uses Claude Code) y ajusta `MINIVERSE_URL` si el servidor no está en `http://localhost:4321`.

## GitHub Pages

En `main`, el workflow `.github/workflows/deploy-miniverse-github-pages.yml` genera el sitio desde esta carpeta.

1. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Tras un push que toque `miniverse/`, la URL será  
   `https://<usuario-o-org>.github.io/<nombre-repo>/`  
   (ej. `https://CARLOSPATINOVELEZ19.github.io/prueba-agente-po/`).

El build usa `VITE_BASE_PATH=/<repo>/` y conecta la UI al mundo público  
`https://miniverse-public-production.up.railway.app` (API + WebSocket `wss://`), como en el [README upstream](https://github.com/ianscott313/miniverse#join-a-public-world). Para desarrollo local se sigue usando `localhost:4321` sin variables.

## Licencia

El código de los paquetes `@miniverse/*` sigue la licencia MIT del proyecto original. Los assets del mundo (`public/worlds/`, etc.) provienen del scaffold oficial.
