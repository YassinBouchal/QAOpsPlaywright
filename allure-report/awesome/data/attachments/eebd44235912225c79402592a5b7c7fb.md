# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientApp.spec.js >> End to end product order test
- Location: tests\ClientApp.spec.js:47:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('//label[text()=\'1\']')
Expected: "1"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" locator('//label[text()=\'1\']') with timeout 5000ms
  - waiting for locator('//label[text()=\'1\']')

```

```yaml
- navigation:
  - link "Automation Automation Practice":
    - /url: ""
    - heading "Automation" [level=3]
    - paragraph: Automation Practice
  - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator.":
    - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
  - list:
    - listitem:
      - button " HOME"
    - listitem
    - listitem:
      - button " ORDERS"
    - listitem:
      - button " Cart"
    - listitem:
      - button "Sign Out"
- paragraph: Home | Search
- heading "Filters" [level=4]
- textbox "search"
- heading "Price Range" [level=6]
- textbox "Min Price"
- textbox "Max Price"
- heading "Categories" [level=6]
- text: 
- checkbox
- text: fashion
- checkbox
- text: electronics
- checkbox
- text: household
- heading "Sub Categories" [level=6]
- text: 
- checkbox
- text: t-shirts
- checkbox
- text: shirts
- checkbox
- text: shoes
- checkbox
- text: mobiles
- checkbox
- text: laptops
- heading "Search For" [level=6]
- text: 
- checkbox
- text: men
- checkbox
- text: women Showing 3 results | User can only see maximum 9 products on a page
- img
- heading "ADIDAS ORIGINAL" [level=5]
- text: $ 11500
- button "View"
- button " Add To Cart"
- img
- heading "ZARA COAT 3" [level=5]
- text: $ 11500
- button "View"
- button " Add To Cart"
- img
- heading "iphone 13 pro" [level=5]
- text: $ 55000
- button "View"
- button " Add To Cart"
- list "Pagination":
  - listitem: « Previous page
  - listitem: You're on page 1
  - listitem: Next page »
- text: Design and Developed By - Kunal Sharma
```

# Test source

```ts
  1   | const {test, expect} = require('@playwright/test');
  2   | 
  3   | 
  4   | // Enabling parallel mode
  5   | //test.describe.configure({ mode: 'parallel' });
  6   | 
  7   | test('@Web Client App login', async ({page})=>
  8   | {
  9   |     const url = "https://rahulshettyacademy.com/client";
  10  |     await page.goto(url);
  11  | 
  12  |     // Locators
  13  |     const registerLink = page.locator('.text-reset');
  14  |     const firstName = page.locator('#firstName');
  15  |     const lastName = page.locator('#lastName');
  16  |     const email = page.locator('#userEmail');
  17  | 
  18  |     const userEmail = "yassin008@test.com"
  19  |     const phoneNumber = page.locator("#userMobile");
  20  |     const password = page.locator("#userPassword");
  21  |     const confirmPassword = page.locator("#confirmPassword");
  22  |     const ageCheckbox =  page.locator("input[type=checkbox]");
  23  |     const registerBtn = page.locator("#login");
  24  |     const loginBtn = page.locator(".btn.btn-primary");
  25  |     const login = page.locator("[value='Login']");
  26  |     const test = page.locator(".test");
  27  |     const cardTitlesExample = page.locator('.card-body b');
  28  | 
  29  |     // Login
  30  |     await email.fill(userEmail);
  31  |     await password.fill("Testing123!");
  32  |     await login.click();
  33  | 
  34  |     // Get first title product element and print it
  35  |     //console.log(await cardTitlesExample.first().textContent());
  36  | 
  37  |     //await page.waitForLoadState('networkidle'); // not recommended for testing purposes
  38  |     await cardTitlesExample.first().waitFor();
  39  |     const titles = await cardTitlesExample.allTextContents();
  40  |     console.log(titles);
  41  | 
  42  | 
  43  |     //console.log(await test.textContent());
  44  | }
  45  | );
  46  | 
  47  | test("End to end product order test", async({page})=>
  48  | {
  49  |     const url = "https://rahulshettyacademy.com/client";
  50  |     await page.goto(url);
  51  | 
  52  |     // Locators
  53  |     const email = page.locator('#userEmail');
  54  |     const userEmail = "yassin008@test.com"
  55  |     const password = page.locator("#userPassword");
  56  |     const login = page.locator("[value='Login']");
  57  | 
  58  |     // Login
  59  |     await email.fill(userEmail);
  60  |     await password.fill("Testing123!");
  61  |     await login.click();
  62  | 
  63  |     // Get product name: 'Zara Coat 3'
  64  |     const product = page.locator("//b[contains(text(),'ZARA')]");
  65  |     const productName = await product.textContent();
  66  | 
  67  |     // Add item to cart
  68  |     const addBtn = page.locator("//button[contains(text(),'Add')]").nth(1);
  69  |     const numberOfItemInCart = page.locator("//label[text()='1']");
  70  | 
  71  |     await addBtn.click();
  72  |     //await page.waitForTimeout(2000);
> 73  |     await expect(numberOfItemInCart).toHaveText('1');
      |                                      ^ Error: expect(locator).toHaveText(expected) failed
  74  | 
  75  |     // Click on Cart
  76  |     /* await page.locator("//button[@routerlink='/dashboard/cart']").click(); */ // my version
  77  |     await page.locator("[routerlink*='cart']").click(); // rahul version
  78  |     await page.locator("div li").first().waitFor();
  79  |     const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  80  |     expect(bool).toBeTruthy();
  81  | 
  82  |     // Assert that the correct product is in the cart // my version
  83  |     /* const productInCart = page.locator('h3').last();
  84  |     await expect(productInCart).toContainText(productName); */
  85  | 
  86  |     // Checkout
  87  |     //await page.locator("//button[text()='Checkout']").click();
  88  |     //or
  89  |     await page.locator("text=Checkout").click();
  90  | 
  91  |     // Assertion in checkout page
  92  |     const itemTitle = page.locator(".item__title");
  93  |     await expect(itemTitle).toContainText(productName);
  94  | 
  95  |     // Enter credit card information
  96  |     //4542 9931 9292 2293
  97  |     const creditCardNumber = "1111 2222 3333 4444";
  98  |     const cvvCode = "123";
  99  |     const name = "Yassin Testing";
  100 | 
  101 |     const creditCardTitle = page.getByText('Credit Card Number');
  102 |     await creditCardTitle.locator('//following-sibling::input').fill(creditCardNumber);
  103 | 
  104 |     const cvvCodeCard = page.getByText('CVV Code ?');
  105 |     await cvvCodeCard.locator('//following-sibling::input').fill(cvvCode);
  106 | 
  107 |     const nameOnCard = page.getByText('Name on Card');
  108 |     await nameOnCard.locator('//following-sibling::input').fill(name);
  109 | 
  110 |     const month = page.locator(".input.ddl").first();
  111 |     const year = page.locator(".input.ddl").last();
  112 |     await month.selectOption("05");
  113 |     await year.selectOption("30");
  114 | 
  115 |     // Verify shipping info + select country
  116 |     await expect(page.locator("//label[@type='text']")).toHaveText(userEmail);
  117 |     const countryDropdown = page.getByPlaceholder("Select Country");
  118 |     const country = "Belgium";
  119 |     await countryDropdown.pressSequentially("Be");
  120 |     //await page.pause();
  121 |     /* await page.locator(`//span[contains(text(),'${country}')]`).waitFor();
  122 |     await page.locator(`//span[contains(text(),'${country}')]`).click(); */
  123 |     // or rahulshetty version - identify results box and wait for it to be shown before clicking on the option (country)
  124 |     const dropdown = page.locator(".ta-results");
  125 |     await dropdown.waitFor();
  126 |     const optionsCount = await dropdown.locator("button").count();
  127 |     console.log(optionsCount.toString());
  128 | 
  129 |     for (let i=0; i < optionsCount; i++){
  130 |         const text = await dropdown.locator("button").nth(i).textContent();
  131 |         if ( text.toString().includes('Belgium')){
  132 |             await dropdown.locator("button").nth(i).click();
  133 |             break;
  134 |         }
  135 |     }    
  136 | 
  137 |    
  138 |     // Apply coupon
  139 |     const couponField = page.getByText('Apply Coupon');
  140 |     const coupon = "rahulshettyacademy"
  141 |     await couponField.locator('//following-sibling::input').fill(coupon);
  142 | 
  143 |     const applyCouponBtn = page.locator("//button[text()='Apply Coupon']");
  144 |     applyCouponBtn.click();
  145 | 
  146 |     const couponApplied = page.locator("//p[text()='* Coupon Applied']");
  147 |     await expect(couponApplied).toBeVisible();
  148 |     
  149 |     // Place order
  150 |     const orderBtn = page.getByText('Place Order');
  151 |     await orderBtn.click();
  152 | 
  153 |     // Assert confirmation message
  154 |     const confirmationMessage = page.getByRole('heading', { name: 'Thankyou for the order.' });
  155 |     await expect(confirmationMessage).toBeVisible();
  156 | 
  157 |     // Capture Order ID
  158 |     const orderId = await page.locator("//label[contains(text(),'|')]").textContent();
  159 |     const orderIdCleanedUp = orderId.toString().substring(3, 27);
  160 |     console.log(orderId);
  161 |     console.log(orderIdCleanedUp);
  162 | 
  163 |     // Go to Orders History Page
  164 |     const ordersHistoryPageLink = page.getByText("Orders History");
  165 |     await ordersHistoryPageLink.click();
  166 | 
  167 |     // View order
  168 |     const orderIdLine = page.getByText(orderIdCleanedUp);
  169 |     await expect(orderIdLine).toBeVisible();
  170 | 
  171 |     //await page.getByRole('button', { name: 'View' }).first().click();
  172 | 
  173 |     // wait for table to show up because next method which is count is not auto waiting
```