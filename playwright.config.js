// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { getBaseUrl } = require('./scripts/get-platform-config.js');

const baseURL = getBaseUrl() || process.env.BASE_URL || 'https://example.com';

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
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
