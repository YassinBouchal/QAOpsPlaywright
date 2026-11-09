const { test, expect } = require('@playwright/test');


test('@Web Client App login', async ({ page }) => {
    const url = "https://rahulshettyacademy.com/client";
    await page.goto(url);

    // Locators
    const registerLink = page.locator('.text-reset');
    const firstName = page.locator('#firstName');
    const lastName = page.locator('#lastName');
    const email = page.getByPlaceholder('email@example.com');
    const password = page.getByPlaceholder("enter your passsword");
    const login = page.getByRole("button", { name: 'Login' });

    const userEmail = "yassin008@test.com"
    const phoneNumber = page.locator("#userMobile");
    const confirmPassword = page.locator("#confirmPassword");
    const ageCheckbox = page.locator("input[type=checkbox]");
    const registerBtn = page.locator("#login");
    const loginBtn = page.locator(".btn.btn-primary");

    const test = page.locator(".test");
    const cardTitlesExample = page.locator('.card-body b');

    // Register
    /* await registerLink.click();
    await firstName.fill("Yassin");
    await lastName.fill("Test");
    await email.fill(userEmail);
    await phoneNumber.fill("2487123456");
    await password.fill("Testing123!");
    await confirmPassword.fill("Testing123!");
    await ageCheckbox.click();
    await registerBtn.click();
    await loginBtn.click(); */


    // Login
    await email.fill(userEmail);
    await password.fill("Testing123!");
    await login.click();

}
);

test("End to end product order test", async ({ page }) => {
    const url = "https://rahulshettyacademy.com/client";
    await page.goto(url);

    // Locators
    const email = page.locator('#userEmail');
    const userEmail = "yassin008@test.com"
    const password = page.locator("#userPassword");
    const login = page.locator("[value='Login']");

    // Login
    await email.fill(userEmail);
    await password.fill("Testing123!");
    await login.click();

    await page.locator('.card-body').first().waitFor();
    await page.locator('.card-body').filter({ hasText: 'ZARA COAT 3' })
        .getByRole("button", { name: ' Add To Cart' }).click();

    const numberOfItemInCart = page.locator("//label[text()='1']");
    await expect(numberOfItemInCart).toHaveText('1');

    await page.getByRole("listitem").getByRole("button", { name: 'Cart' }).click();

    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button", { name: 'Checkout' }).click();



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
    //await page.pause();
    /* await page.locator(`//span[contains(text(),'${country}')]`).waitFor();
    await page.locator(`//span[contains(text(),'${country}')]`).click(); */
    // or rahulshetty version - identify results box and wait for it to be shown before clicking on the option (country)
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    console.log(optionsCount.toString());

    await page.getByRole("button", { name: country }).click();


    // Apply coupon
    const coupon = "rahulshettyacademy"
    await page.locator("[name='coupon']").fill(coupon);


    await page.getByRole("button", { name: 'Apply Coupon' }).click();

    const couponApplied = page.getByText("* Coupon Applied");
    await expect(couponApplied).toBeVisible();

    // Place order
    //await page.getByRole("link", {name: 'PLACE ORDER'}).click();
    await page.getByText("PLACE ORDER").click();

    // Assert confirmation message
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();

    // Capture Order ID
    const orderId = await page.locator("//label[contains(text(),'|')]").textContent();
    const orderIdCleanedUp = orderId.toString().substring(3, 27);
    console.log(orderId);
    console.log(orderIdCleanedUp);

    // Go to Orders History Page
    await page.getByText('Orders History Page').click();

    // View order
    await expect(page.getByText(orderIdCleanedUp)).toBeVisible();

    //await page.getByRole('button', { name: 'View' }).first().click();

    // wait for table to show up because next method which is count is not auto waiting
    await page.locator("tbody").waitFor();

    const rows = page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        console.log("rowOrderId = " + rowOrderId)

        if (rowOrderId === orderIdCleanedUp) {
            await rows.nth(i).getByText("View").click();
            break;
        }
    }

    // Verify order summary page
    await expect(page.locator('app-order-details')).toContainText(userEmail);
    await expect(page.locator('app-order-details')).toContainText(country);
    await expect(page.locator('app-order-details')).toContainText(orderIdCleanedUp);

    //await page.pause();
}
);


test('Codegen Test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByRole('link', { name: 'Shop' }).click();
    await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
    await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click();
    await page.getByText('Checkout ( 2 ) (current)').click();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
    await page.getByRole('textbox', { name: 'Please choose your delivery' }).pressSequentially('belgium');
    await page.getByText('Belgium').click();
    await page.getByText('I agree with the term &').click();
    await page.getByRole('checkbox', { name: 'I agree with the term &' }).check();
    await page.getByRole('button', { name: 'Purchase' }).click();
    await expect(page.locator('app-checkout')).toContainText('Please choose your delivery location. Then click on purchase button');
    await expect(page.getByText('× Success! Thank you! Your')).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Please choose your delivery' })).toHaveValue('Belgium');
});