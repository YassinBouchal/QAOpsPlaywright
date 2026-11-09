const {test, expect} = require('@playwright/test');


// Enabling parallel mode
//test.describe.configure({ mode: 'parallel' });

test('@Web Client App login', async ({page})=>
{
    const url = "https://rahulshettyacademy.com/client";
    await page.goto(url);

    // Locators
    const registerLink = page.locator('.text-reset');
    const firstName = page.locator('#firstName');
    const lastName = page.locator('#lastName');
    const email = page.locator('#userEmail');

    const userEmail = "yassin008@test.com"
    const phoneNumber = page.locator("#userMobile");
    const password = page.locator("#userPassword");
    const confirmPassword = page.locator("#confirmPassword");
    const ageCheckbox =  page.locator("input[type=checkbox]");
    const registerBtn = page.locator("#login");
    const loginBtn = page.locator(".btn.btn-primary");
    const login = page.locator("[value='Login']");
    const test = page.locator(".test");
    const cardTitlesExample = page.locator('.card-body b');

    // Login
    await email.fill(userEmail);
    await password.fill("Testing123!");
    await login.click();

    // Get first title product element and print it
    //console.log(await cardTitlesExample.first().textContent());

    //await page.waitForLoadState('networkidle'); // not recommended for testing purposes
    await cardTitlesExample.first().waitFor();
    const titles = await cardTitlesExample.allTextContents();
    console.log(titles);


    //console.log(await test.textContent());
}
);
// just a comment
test("End to end product order test", async({page})=>
{
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

    // Get product name: 'Zara Coat 3'
    const product = page.locator("//b[contains(text(),'ZARA')]");
    const productName = await product.textContent();

    // Add item to cart
    const addBtn = page.locator("//button[contains(text(),'Add')]").nth(1);
    const numberOfItemInCart = page.locator("//label[text()='1']");

    await addBtn.click();
    //await page.waitForTimeout(2000);
    await expect(numberOfItemInCart).toHaveText('1');

    // Click on Cart
    /* await page.locator("//button[@routerlink='/dashboard/cart']").click(); */ // my version
    await page.locator("[routerlink*='cart']").click(); // rahul version
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    // Assert that the correct product is in the cart // my version
    /* const productInCart = page.locator('h3').last();
    await expect(productInCart).toContainText(productName); */

    // Checkout
    //await page.locator("//button[text()='Checkout']").click();
    //or
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
    //await page.pause();
    /* await page.locator(`//span[contains(text(),'${country}')]`).waitFor();
    await page.locator(`//span[contains(text(),'${country}')]`).click(); */
    // or rahulshetty version - identify results box and wait for it to be shown before clicking on the option (country)
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    console.log(optionsCount.toString());

    for (let i=0; i < optionsCount; i++){
        const text = await dropdown.locator("button").nth(i).textContent();
        if ( text.toString().includes('Belgium')){
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

    for(let i = 0; i < await rows.count(); i++) {
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