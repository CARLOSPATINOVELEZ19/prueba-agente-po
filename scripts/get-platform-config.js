/**
 * Lee la configuración de plataforma desde Workspace/config/platforms.json.
 * Usado por Playwright, audit y otros scripts para mantener el proyecto agnóstico.
 *
 * @returns {object|null} Config de defecto, o null si no existe
 */
const path = require('path');
const fs = require('fs');

const CONFIG_PATH = path.join(__dirname, '../Workspace/config/platforms.json');

function getPlatformsConfig() {
  if (!fs.existsSync(CONFIG_PATH)) return null;
  return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
}

function getPlatformConfig() {
  const config = getPlatformsConfig();
  if (!config) return null;

  const platform =
    config.platforms?.find((p) => p.id === config.defaultPlatformId) || config.platforms?.[0];
  return platform || null;
}

/**
 * Obtiene todas las plataformas configuradas (para filtros, índices, etc.)
 */
function getAllPlatforms() {
  const config = getPlatformsConfig();
  return config?.platforms || [];
}

/**
 * Obtiene la URL base de la app (desde config o env)
 */
function getBaseUrl() {
  const platform = getPlatformConfig();
  return platform?.urls?.app || process.env.BASE_URL || null;
}

/**
 * Obtiene los paths para smoke tests (desde config o default)
 */
function getSmokePaths() {
  const platform = getPlatformConfig();
  return platform?.smokePaths || ['/'];
}

/**
 * Obtiene las zonas para auditoría (desde config o default)
 */
function getAuditZones() {
  const platform = getPlatformConfig();
  if (platform?.auditZones?.length) return platform.auditZones;
  return [{ name: 'Home', url: '/' }];
}

module.exports = {
  getPlatformConfig,
  getBaseUrl,
  getSmokePaths,
  getAuditZones,
  getAllPlatforms,
  getPlatformsConfig,
};
