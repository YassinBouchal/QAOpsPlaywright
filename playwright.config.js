// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { workers } from 'node:cluster';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries: 3,
  //workers: 3,
  timeout: 30 * 1000, // 30sec 
  expect: {
    timeout: 5000,
  },
  
  //reporter: 'html',
  reporter: 'allure-playwright',
  use: {
    //actionTimeout: 15 * 1000, // click(), check(), fill(), ... will fail after 15sec if not set => global timeout is used (30sec)
    browserName: 'chromium', // chromium, firefox, webkit
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure', //off, on => retain-on-failure preferred to save memory
    video: 'retain-on-failure'
  },


});

module.exports = config 

