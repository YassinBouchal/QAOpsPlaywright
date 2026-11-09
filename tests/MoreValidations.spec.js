import test, { expect } from "@playwright/test";


test("Popup validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    /* await page.goto("https://google.com");
    await page.goBack(); // back to rahulshetty website
    await page.goForward(); // back to google */
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    // Handling popups
    page.on('dialog', dialog => dialog.accept()); // or dismiss() to cancel
    await page.locator("#confirmbtn").click();

    // Mouse hover
    await page.locator("#mousehover").hover();

    // Handling iframes
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    const numberOfSubscribers = textCheck.split(" ")[1];
    console.log("Number of subscribers = " + numberOfSubscribers)

});

test("Screenshot", async({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'partial-screenshot.png'});

    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});

    await expect(page.locator("#displayed-text")).toBeHidden();
});

/* test("Visual Comparison", async({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
}); */