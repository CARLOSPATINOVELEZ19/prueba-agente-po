/**
 * Datos y helpers para auditoría de consola (ciencuadras.com)
 */

const ZONES = [
  { name: "Home", url: "/" },
  { name: "Arriendo", url: "/arriendo" },
  { name: "Venta", url: "/venta" },
  { name: "Inmobiliarias", url: "/inmobiliarias" },
  { name: "Constructoras", url: "/constructoras" },
  { name: "Blog", url: "/blog" },
  { name: "Auth/Login", url: "/auth" },
  { name: "Productos", url: "/productos" },
  { name: "Remates", url: "/inmuebles-en-remate" },
];

function createEmptyReport() {
  return {
    timestamp: new Date().toISOString(),
    zones: [],
    allConsoleMessages: [],
    summary: { errors: 0, warnings: 0, logs: 0 },
  };
}

function categorizeMessage(type, summary) {
  if (type === "error") summary.errors++;
  else if (type === "warning") summary.warnings++;
  else summary.logs++;
}

module.exports = { ZONES, createEmptyReport, categorizeMessage };
