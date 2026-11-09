import test, { expect } from "@playwright/test";

// 30 seconds max - before test timeout error (set in config file)
test('Playwright Special locators', async({page})=>{
    //test.setTimeout(60000);
    //page.setDefaultTimeout(15_000);
    //page.locator("test00").waitFor({timeout: 65_000})

    const slowExpect = expect.configure({timeout: 9000}); // test level

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    // Get by Labels
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    // Get by Placeholders
    await page.getByPlaceholder("Password").fill("Password");
    // Get by Roles
    await page.getByRole("button", {name: 'Submit'}).click({timeout: 15_000}); //timeout on step level
    // Get by Texts
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible(); // here it does not fail, only true or false
    
    // 5 seconds default timeout for expect assertions - we can override timeout like shown below: at step level
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();

    // on global level via the config file
    // on test level

    await page.getByRole("link", {name: 'Shop'}).click();
    await expect(page.locator(".my-4").first()).toHaveText("Shop Name");

    await page.locator("app-card").filter({
        hasText: 'Nokia Edge'
    }).getByRole("button").click(); // if only one button available, no need to use name
    //await page.pause();
});