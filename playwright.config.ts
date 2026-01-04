import { chromium, defineConfig, devices, firefox } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../TestData/.env') });


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 120_000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI === 'true' ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI === 'true' ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
  ['list', { printSteps: true }],
  ['html', { outputFolder: 'playwright-report', open: 'always' }]
],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
    // actionTimeout:30000,
    baseURL: process.env.Base_URL,
    headless: process.env.HEADLESS === 'true' ? true : false,
    ignoreHTTPSErrors: true,
    viewport: { width: 1280, height: 720 },
    video: 'on',
    screenshot: 'only-on-failure',
    trace: 'on',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
      headless: false,
      ignoreHTTPSErrors: true,
      viewport: { width: 1280, height: 720 },
      video: 'on',
      screenshot: 'only-on-failure',
      trace: 'on'
       },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'],
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
