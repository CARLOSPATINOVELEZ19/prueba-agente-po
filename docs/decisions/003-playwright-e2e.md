# ADR 003: Playwright para tests E2E

## Estado

Aceptado

## Contexto

El workspace incluye tests E2E para el portal Ciencuadras (navegador). Se necesita un framework que cubra tests E2E y auditoría.

## Opciones consideradas

1. **Cypress** — Popular para E2E en navegador, menos adecuado para tests de API pura
2. **Puppeteer** — Bajo nivel, sin abstracciones de testing
3. **Playwright** — API unificada para navegador y API, multi-browser, screenshots, traces

## Decisión

Se eligió **Playwright** porque:

- Soporta `page` (navegador) y `request` (API) en el mismo framework
- El script de auditoría (`audit-console-errors.js`) ya usa Playwright (firefox) para capturar errores de consola
- Traces y screenshots en fallos facilitan el debugging
- Integración con CI (reporter `github`)

## Consecuencias

- Un solo framework para E2E y auditoría
- Comando único: `npm test`
- Base URL configurable (`baseURL` en playwright.config.js para Ciencuadras)
