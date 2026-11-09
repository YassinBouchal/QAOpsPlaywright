const { Given, When, Then, And } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

// This = World constructor

Given('A login to ecommerce application with {string} and {string}', { timeout: 100_000 }, async function (username, password) {
    this.username = username;


    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    // Login
    await loginPage.validLogin(username, password);

});

When('Add {string} item to cart', async function (productName) {
    this.productName = productName;

    const dashboardPage = this.poManager.getDashboardPage();
    await dashboardPage.addProductToCart(productName);
    await dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.waitForCartPageLoading();
    await expect(this.page.locator(`h3:has-text('${productName}')`)).toBeVisible()
    await cartPage.checkout();
});

When('Enter valid details {string}, {string}, {string}, {string}, {string}, {string}, {string}  and place the order',
    async function (creditCardNumber, cvvCode, cardHolder, monthExpiryDate, yearExpiryDate, country, coupon) {
        // Assertion in checkout page
        const itemTitle = this.page.locator(".item__title");
        await expect(itemTitle).toContainText(this.productName);

        const checkoutPage = this.poManager.getCheckoutPage();
        await checkoutPage.fillCreditCardInformation(
            creditCardNumber,
            cvvCode,
            cardHolder,
            monthExpiryDate,
            yearExpiryDate);

        // Verify shipping info + select country
        await expect(this.page.locator("//label[@type='text']")).toHaveText(this.username);
        await checkoutPage.selectCountry(country);
        // Apply coupon
        await checkoutPage.applyCoupon(coupon);
        const couponApplied = this.page.getByText('* Coupon Applied');
        await expect(couponApplied).toBeVisible();
        // Place order
        await checkoutPage.placeOrder();
    });

Then('Verify order is present in the Orders History Page with {string}, {string}', async function (username, country) {
    const thankYouPage = this.poManager.getThankYouPage();
    // Assert confirmation message
    await expect(thankYouPage.confirmationMessage).toBeVisible();
    // Capture Order ID
    const orderId = await thankYouPage.getOrderIdCleanedUp();
    // Go to Orders History Page
    await thankYouPage.navigateToOrdersHistoryPage();
    // View order
    this.ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await expect(await this.ordersHistoryPage.getOrderIdCellLocator(orderId)).toBeVisible();
    await this.ordersHistoryPage.table.waitFor();
    await this.ordersHistoryPage.viewOrderById(orderId)

    await this.ordersHistoryPage.vadidateOrder(username, country, orderId);
});

Given('A login to ecommerce2 application with {string} and {string}', async function (username, password) {

    const userName = this.page.locator('#username');
    const passwordField = this.page.locator('[type="password"]');
    const signIn = this.page.locator('#signInBtn');
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await this.page.title());

    await userName.fill(username);
    await passwordField.fill(password);
    await signIn.click();

});

Then('Verify Error message is displayed', async function () {
    console.log(await this.page.locator('[style*="block"]').textContent());
    await expect(this.page.locator('[style*="block"]')).toContainText('Incorrect');
});