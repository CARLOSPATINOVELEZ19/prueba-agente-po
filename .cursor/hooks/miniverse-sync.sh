#!/usr/bin/env bash
# Ejecuta cursor-miniverse-sync.mjs desde la raíz del repositorio.
# Cursor inyecta el JSON del hook por stdin; debe llegar intacto a Node.
set -euo pipefail

MODE="${1:?Uso: miniverse-sync.sh subagentStart|subagentStop}"
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
cd "$ROOT"

# Cursor a veces lanza hooks con un PATH mínimo; Node suele estar en Homebrew/PATH estándar.
export PATH="/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

exec node miniverse/scripts/cursor-miniverse-sync.mjs "$MODE"
