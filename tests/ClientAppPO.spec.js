const { test, expect } = require('@playwright/test');
const { customtest } = require("../utils/test-base")
const { POManager } = require('../pageobjects/POManager');
// JSON -> String -> JS object
const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));



customtest('Client App login using POM', { tag: '@TestDataAsFixture' }, async ({ page, testDataForOrder }) => {
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    // Login
    await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);

    const cardTitlesExample = page.locator('.card-body b');


    await cardTitlesExample.first().waitFor();
    const titles = await cardTitlesExample.allTextContents();
    console.log(titles);
}
);

for(const data of dataset) {
    test(`End to end product order test for ID ${data.id}`, async ({ page }) => {
        const poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        // Login
        await loginPage.validLogin(data.username, data.password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.addProductToCart(data.productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.waitForCartPageLoading();
        await expect(page.locator(`h3:has-text('${data.productName}')`)).toBeVisible()
        await cartPage.checkout();

        // Assertion in checkout page
        const itemTitle = page.locator(".item__title");
        await expect(itemTitle).toContainText(data.productName);

        const checkoutPage = poManager.getCheckoutPage();
        await checkoutPage.fillCreditCardInformation(
            data.creditCardInformation.creditCardNumber,
            data.creditCardInformation.cvvCode,
            data.creditCardInformation.cardHolder,
            data.creditCardInformation.monthExpiryDate,
            data.creditCardInformation.yearExpiryDate);

        // Verify shipping info + select country
        await expect(page.locator("//label[@type='text']")).toHaveText(data.username);
        await checkoutPage.selectCountry(data.country);
        // Apply coupon
        await checkoutPage.applyCoupon(data.coupon);
        const couponApplied = page.getByText('* Coupon Applied');
        await expect(couponApplied).toBeVisible();
        // Place order
        await checkoutPage.placeOrder();
        const thankYouPage = poManager.getThankYouPage();
        // Assert confirmation message
        await expect(thankYouPage.confirmationMessage).toBeVisible();
        // Capture Order ID
        const orderId = await thankYouPage.getOrderIdCleanedUp();
        // Go to Orders History Page
        await thankYouPage.navigateToOrdersHistoryPage();
        // View order
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await expect(await ordersHistoryPage.getOrderIdCellLocator(orderId)).toBeVisible();
        await ordersHistoryPage.table.waitFor();
        await ordersHistoryPage.viewOrderById(orderId)

        // Verify order summary page
        await ordersHistoryPage.vadidateOrder(data.username, data.country, orderId);

    }
    );
}

