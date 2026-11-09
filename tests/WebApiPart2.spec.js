// Login UI ->store to .json file
// test browser -> .json, cart-, order, orderdetails; ordershistory

// Workaround for complex logins with multiple tokens, etc.
const { test, expect } = require('@playwright/test');

let webContext;
const url = "https://rahulshettyacademy.com/client";
const userEmail = "yassin008@test.com"

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(url);
    const email = page.locator('#userEmail');
    const password = page.locator("#userPassword");
    const login = page.locator("[value='Login']");

    await email.fill(userEmail);
    await password.fill("Testing123!");
    await login.click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });

    webContext = await browser.newContext({ storageState: 'state.json' });


});

test('@Web Client App login', async () => {

    const page = await webContext.newPage();
    await page.goto(url);

    const cardTitlesExample = page.locator('.card-body b');
    await cardTitlesExample.first().waitFor();
    const titles = await cardTitlesExample.allTextContents();
    console.log(titles);

}
);

test("End to end product order test", async () => {

    const page = await webContext.newPage();
    await page.goto(url);

    // Get product name: 'Zara Coat 3'
    const product = page.locator("//b[contains(text(),'ZARA')]");
    const productName = await product.textContent();

    // Add item to cart
    const addBtn = page.locator("//button[contains(text(),'Add')]").nth(1);
    const numberOfItemInCart = page.locator("//label[text()='1']");

    await addBtn.click();
    await expect(numberOfItemInCart).toHaveText('1');

    // Click on Cart
    await page.locator("[routerlink*='cart']").click(); // rahul version
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    // Assertion in checkout page
    const itemTitle = page.locator(".item__title");
    await expect(itemTitle).toContainText(productName);

    // Enter credit card information
    //4542 9931 9292 2293
    const creditCardNumber = "1111 2222 3333 4444";
    const cvvCode = "123";
    const name = "Yassin Testing";

    const creditCardTitle = page.getByText('Credit Card Number');
    await creditCardTitle.locator('//following-sibling::input').fill(creditCardNumber);

    const cvvCodeCard = page.getByText('CVV Code ?');
    await cvvCodeCard.locator('//following-sibling::input').fill(cvvCode);

    const nameOnCard = page.getByText('Name on Card');
    await nameOnCard.locator('//following-sibling::input').fill(name);

    const month = page.locator(".input.ddl").first();
    const year = page.locator(".input.ddl").last();
    await month.selectOption("05");
    await year.selectOption("30");

    // Verify shipping info + select country
    await expect(page.locator("//label[@type='text']")).toHaveText(userEmail);
    const countryDropdown = page.getByPlaceholder("Select Country");
    const country = "Belgium";
    await countryDropdown.pressSequentially("Be");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    console.log(optionsCount.toString());

    for (let i = 0; i < optionsCount; i++) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text.toString().includes('Belgium')) {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }


    // Apply coupon
    const couponField = page.getByText('Apply Coupon');
    const coupon = "rahulshettyacademy"
    await couponField.locator('//following-sibling::input').fill(coupon);

    const applyCouponBtn = page.locator("//button[text()='Apply Coupon']");
    applyCouponBtn.click();

    const couponApplied = page.locator("//p[text()='* Coupon Applied']");
    await expect(couponApplied).toBeVisible();

    // Place order
    const orderBtn = page.getByText('Place Order');
    await orderBtn.click();

    // Assert confirmation message
    const confirmationMessage = page.getByRole('heading', { name: 'Thankyou for the order.' });
    await expect(confirmationMessage).toBeVisible();

    // Capture Order ID
    const orderId = await page.locator("//label[contains(text(),'|')]").textContent();
    const orderIdCleanedUp = orderId.toString().substring(3, 27);
    console.log(orderId);
    console.log(orderIdCleanedUp);

    // Go to Orders History Page
    const ordersHistoryPageLink = page.getByText("Orders History");
    await ordersHistoryPageLink.click();

    // View order
    const orderIdLine = page.getByText(orderIdCleanedUp);
    await expect(orderIdLine).toBeVisible();

    //await page.getByRole('button', { name: 'View' }).first().click();

    // wait for table to show up because next method which is count is not auto waiting
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        console.log("rowOrderId = " + rowOrderId)

        if (rowOrderId === orderIdCleanedUp) {
            await rows.nth(i).locator("text=View").click();
            break;
        }
    }

    // Verify order summary page
    await expect(page.locator('app-order-details')).toContainText(userEmail);
    await expect(page.locator('app-order-details')).toContainText(country);
    await expect(page.locator('app-order-details')).toContainText(orderIdCleanedUp);

}
);

test('Test case 2', async () => {
    const page = await webContext.newPage();
    await page.goto(url);

    const cardTitlesExample = page.locator('.card-body b');
    await cardTitlesExample.first().waitFor();
    const titles = await cardTitlesExample.allTextContents();
    console.log(titles);
});

test("mocks a fruit and doesn't call api", async ({ page }) => {
  // Mock the api call before navigating
  await page.route('*/**/api/v1/fruits', async route => {
    const json = [
        { 
            name: 'Strawberry', 
            id: 21 
        },
        { 
            name: 'Banana', 
            id: 22 
        }
    ];
    await route.fulfill({ json });
  });
  // Go to the page
  await page.goto('https://demo.playwright.dev/api-mocking');

  // Assert that the Strawberry fruit is visible
  await expect(page.getByText('Strawberry')).toBeVisible();
});