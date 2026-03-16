const { test, expect } = require('@playwright/test');

test.describe('Ciencuadras - Smoke tests', () => {
  test('Home carga correctamente', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/ciencuadras/i);
    await expect(page.locator('body')).toBeVisible();
  });

  test('Sección Arriendo carga', async ({ page }) => {
    await page.goto('/arriendo');
    await expect(page).toHaveURL(/arriendo/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('Sección Venta carga', async ({ page }) => {
    await page.goto('/venta');
    await expect(page).toHaveURL(/venta/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('Home responde sin errores de red críticos', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBeLessThan(500);
    await expect(page.locator('body')).toBeVisible();
  });
});
