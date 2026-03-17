/**
 * Lee la configuración de plataforma desde Workspace/config/platforms.json.
 * Usado por Playwright, audit y otros scripts para mantener el proyecto agnóstico.
 *
 * @returns {object|null} Config de la plataforma por defecto, o null si no existe
 */
const path = require('path');
const fs = require('fs');

function getPlatformConfig() {
  const configPath = path.join(__dirname, '../Workspace/config/platforms.json');
  if (!fs.existsSync(configPath)) return null;

  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  const platform =
    config.platforms?.find((p) => p.id === config.defaultPlatformId) || config.platforms?.[0];
  return platform || null;
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

module.exports = { getPlatformConfig, getBaseUrl, getSmokePaths, getAuditZones };
