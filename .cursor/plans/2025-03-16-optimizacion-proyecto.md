# Plan: Optimización del proyecto prueba-agente-po

**Fecha:** 2025-03-16  
**Objetivo:** Mejorar calidad, mantenibilidad y utilidad del proyecto raíz.

## Contexto

El proyecto es un workspace de pruebas E2E con Playwright que incluye:
- Script de auditoría de errores de consola (ciencuadras.com)
- Tests placeholder sin valor real
- Sin linting/formatting en raíz
- Sin documentación de estructura

## Cambios planificados

### 1. Documentación
- [x] README.md con estructura, comandos, enlaces a docs

### 2. Calidad de código
- [x] ESLint + Prettier en proyecto raíz
- [x] Configuración alineada con estándares (singleQuote, semi, etc.)

### 3. Playwright
- [x] Config: retries en CI, reporter HTML opcional, baseURL
- [x] Tests reales: smoke de ciencuadras.com (home, arriendo, venta)
- [x] Script `audit` en package.json para ejecutar auditoría

### 4. Scripts
- [x] `npm run test` — tests E2E
- [x] `npm run audit` — auditoría de consola
- [x] `npm run lint` — ESLint
- [x] `npm run format` — Prettier

## Criterios de éxito

- `npm run test` ejecuta tests con cobertura de flujos críticos
- `npm run audit` genera reporte en audit-output/
- Linting y formato consistentes
