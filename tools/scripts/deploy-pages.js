#!/usr/bin/env node
/**
 * Regenera reportes y los copia a docs/ para publicación en GitHub Pages.
 * Ejecutar antes de push cuando se quieran publicar reportes actualizados.
 *
 * Uso: npm run deploy:pages
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '../..');
const WORKSPACE_REPORTS = path.join(ROOT, 'Workspace/reports');
const WORKSPACE_AUDIT = path.join(ROOT, 'Workspace/audit');
const DOCS = path.join(ROOT, 'docs');

function main() {
  console.log('Regenerando reportes...');
  execSync('npm run report:cycle', {
    cwd: ROOT,
    stdio: 'inherit',
  });

  if (!fs.existsSync(WORKSPACE_REPORTS)) {
    console.error('No se encontró Workspace/reports/. Ejecuta npm run report:cycle primero.');
    process.exit(1);
  }

  const files = fs.readdirSync(WORKSPACE_REPORTS).filter((f) => f.endsWith('.html'));
  if (files.length === 0) {
    console.log('No hay archivos HTML en Workspace/reports/.');
  } else {
    console.log(`Copiando ${files.length} reporte(s) a docs/...`);
    for (const file of files) {
      const src = path.join(WORKSPACE_REPORTS, file);
      const dest = path.join(DOCS, file);
      fs.copyFileSync(src, dest);
      console.log(`  ${file} -> docs/${file}`);
    }
  }

  // Copiar screenshots de auditoría si existen (para auditoria-errores-consola.html)
  const auditScreenshots = path.join(WORKSPACE_AUDIT, 'screenshots');
  const docsScreenshots = path.join(DOCS, 'screenshots-auditoria');
  if (fs.existsSync(auditScreenshots)) {
    if (!fs.existsSync(docsScreenshots)) fs.mkdirSync(docsScreenshots, { recursive: true });
    const screens = fs.readdirSync(auditScreenshots).filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f));
    for (const f of screens) {
      fs.copyFileSync(path.join(auditScreenshots, f), path.join(docsScreenshots, f));
    }
    console.log(`  screenshots-auditoria/ (${screens.length} archivos)`);
  }

  console.log('Listo. Haz commit y push para publicar en GitHub Pages.');
}

main();
