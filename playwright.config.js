import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Folder where tests are located
  timeout: 30 * 1000, // Global timeout for each test
  expect: {
    timeout: 5000 // Timeout for expect assertions
  },
  fullyParallel: true, // Run tests in parallel
  reporter: [['html'], ['list'], ['allure-playwright']], // Report formats
  use: {
    // baseURL: 'https://example.com', // Base URL for page.goto()
    headless: false, // Run tests without opening browser UI
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure', // Take screenshot on failure
    video: 'retain-on-failure', // Record video on failure
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { 
    //       ...devices['Desktop Firefox'],
    //       // Optional: Increase the context/browser launch timeout specifically for Firefox (in ms)
    //       // If you don't have a specific launch timeout defined, this may help.
    //       launchTimeout: 60000, }
    // },
    // {
    //   name: 'WebKit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
