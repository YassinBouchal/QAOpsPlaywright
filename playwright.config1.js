// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 30 * 1000, // 30sec 
  expect: {
    timeout: 5000,
  },

  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit', // chromium, firefox, webkit
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure', //off, on => retain-on-failure preferred to save memory
        ...devices['iPhone 17 Pro Max'],
        video: 'retain-on-failure'
      },
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium', // chromium, firefox, webkit
        headless: false,
        screenshot: 'on',
        trace: 'retain-on-failure', //off, on => retain-on-failure preferred to save memory
        //viewport: { width: 1280, height: 720 },
      },
    }
  ]



});

module.exports = config

