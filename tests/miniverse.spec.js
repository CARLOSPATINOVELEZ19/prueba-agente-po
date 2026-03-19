// @ts-check
/**
 * Smoke tests E2E para Miniverse.
 * Ejecutar con: npx playwright test tests/miniverse.spec.js --project=miniverse
 * Requiere servidor Miniverse en http://localhost:3001 (npm run dev:full desde miniverse/)
 */
const { test, expect } = require('@playwright/test');

test.describe('Miniverse', () => {
  test('carga el mundo y muestra el canvas', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Miniverse');
    await expect(page.locator('#world-canvas')).toBeVisible();
  });

  test('API heartbeat responde correctamente', async ({ request }) => {
    const res = await request.post('/api/heartbeat', {
      data: { agent: 'e2e-test', name: 'E2E', state: 'idle' },
    });
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.citizen.agent).toBe('e2e-test');
  });
});
