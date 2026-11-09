const {test, expect} = require('@playwright/test');
const { customtest } = require('../utils/fixtures');

customtest("Fixtures demo", async({authenticatedPage, createOrder, testDataForOrder}) => {

    // Login bypassed by the authenticatedPage fixture
    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
    await authenticatedPage.locator("button[routerlink*='myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible();
    console.log(testDataForOrder.productName);

});