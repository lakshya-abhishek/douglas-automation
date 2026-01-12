import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  workers: 3,

  reporter: [
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['allure-playwright']
  ],

  use: {
    baseURL: 'https://www.douglas.de',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    viewport: { width: 1920, height: 1080 },
  },

  projects: [
    // Chrome Stealth
    {
      name: 'chrome-stealth',
      use: { 
        //...devices['Desktop Chrome'],
        channel: 'chrome', 
        headless: false,
        viewport: null, 
        deviceScaleFactor: undefined,
        launchOptions: {
          args: [
            '--disable-blink-features=AutomationControlled',
            '--start-maximized',
            '--disable-features=VizDisplayCompositor',
          ],
        },
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'], 
        headless: false,
      },
    },
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'], 
        headless: false,
      },
    },
    {
      name: 'chrome-local',
      use: { 
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        headless: false,
      },
    },
  ],
});