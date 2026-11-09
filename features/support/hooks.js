const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');
const { After, Before, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber')

Before(async function () {
    this.browser = await playwright.chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

    this.poManager = new POManager(this.page);
});

After(function () {
    console.log("I am last to execute");
});

BeforeStep(function () {
    // This hook will be executed before all steps in a scenario with tag @foo
})

AfterStep(async function ({ result }) {
    // This hook will be executed after all steps, and take a screenshot on step failure
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot69.png' });
    }
})