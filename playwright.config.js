// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testIgnore: ['**/unit/**'],
  timeout: 30000,
  retries: process.env.CI ? 1 : 0,
  outputDir: './Workspace/playwright/test-results',
  reporter:
    process.env.CI
      ? 'github'
      : ['list', ['html', { outputFolder: './Workspace/playwright/playwright-report' }]],
  use: {
    baseURL: 'https://www.ciencuadras.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
