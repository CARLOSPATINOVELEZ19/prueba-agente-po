/**
 * Raíz del workspace de artefactos (planes, reportes, audit, playwright).
 * WORKSPACE_ROOT (env): ruta absoluta o relativa al repo (ej. Workspace/ciencuadras).
 * Si no está definida, se usa Workspace/ciencuadras/ (artefactos por defecto del producto principal).
 */
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');

function getWorkspaceRoot() {
  const w = process.env.WORKSPACE_ROOT?.trim();
  if (!w) return path.join(REPO_ROOT, 'Workspace', 'ciencuadras');
  return path.isAbsolute(w) ? w : path.join(REPO_ROOT, w);
}

module.exports = { getWorkspaceRoot, REPO_ROOT };
