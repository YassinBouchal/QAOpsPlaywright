# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppPO.spec.js >> End to end product order test for ID 1
- Location: tests\ClientAppPO.spec.js:29:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h3:has-text(\'ZARA COAT 3\')')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('h3:has-text(\'ZARA COAT 3\')') with timeout 5000ms
  - waiting for locator('h3:has-text(\'ZARA COAT 3\')')

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
- heading "My Cart" [level=1]
- button "Continue Shopping❯"
- heading "No Products in Your Cart !" [level=1]
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const { customtest } = require("../utils/test-base")
  3  | const { POManager } = require('../pageobjects/POManager');
  4  | // JSON -> String -> JS object
  5  | const dataset = JSON.parse(JSON.stringify(require("../utils/placeorderTestData.json")));
  6  | 
  7  | 
  8  | 
  9  | customtest('Client App login using POM', { tag: '@TestDataAsFixture' }, async ({ page, testDataForOrder }) => {
  10 |     const poManager = new POManager(page);
  11 | 
  12 |     const url = "https://rahulshettyacademy.com/client";
  13 | 
  14 |     const loginPage = poManager.getLoginPage();
  15 |     await loginPage.goTo(url);
  16 |     // Login
  17 |     await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
  18 | 
  19 |     const cardTitlesExample = page.locator('.card-body b');
  20 | 
  21 | 
  22 |     await cardTitlesExample.first().waitFor();
  23 |     const titles = await cardTitlesExample.allTextContents();
  24 |     console.log(titles);
  25 | }
  26 | );
  27 | 
  28 | for(const data of dataset) {
  29 |     test(`End to end product order test for ID ${data.id}`, async ({ page }) => {
  30 |         const poManager = new POManager(page);
  31 | 
  32 |         const url = "https://rahulshettyacademy.com/client";
  33 | 
  34 |         const loginPage = poManager.getLoginPage();
  35 |         await loginPage.goTo(url);
  36 |         // Login
  37 |         await loginPage.validLogin(data.username, data.password);
  38 | 
  39 |         const dashboardPage = poManager.getDashboardPage();
  40 |         await dashboardPage.addProductToCart(data.productName);
  41 |         await dashboardPage.navigateToCart();
  42 | 
  43 |         const cartPage = poManager.getCartPage();
  44 |         await cartPage.waitForCartPageLoading();
> 45 |         await expect(page.locator(`h3:has-text('${data.productName}')`)).toBeVisible()
     |                                                                          ^ Error: expect(locator).toBeVisible() failed
  46 |         await cartPage.checkout();
  47 | 
  48 |         // Assertion in checkout page
  49 |         const itemTitle = page.locator(".item__title");
  50 |         await expect(itemTitle).toContainText(data.productName);
  51 | 
  52 |         const checkoutPage = poManager.getCheckoutPage();
  53 |         await checkoutPage.fillCreditCardInformation(
  54 |             data.creditCardInformation.creditCardNumber,
  55 |             data.creditCardInformation.cvvCode,
  56 |             data.creditCardInformation.cardHolder,
  57 |             data.creditCardInformation.monthExpiryDate,
  58 |             data.creditCardInformation.yearExpiryDate);
  59 | 
  60 |         // Verify shipping info + select country
  61 |         await expect(page.locator("//label[@type='text']")).toHaveText(data.username);
  62 |         await checkoutPage.selectCountry(data.country);
  63 |         // Apply coupon
  64 |         await checkoutPage.applyCoupon(data.coupon);
  65 |         const couponApplied = page.getByText('* Coupon Applied');
  66 |         await expect(couponApplied).toBeVisible();
  67 |         // Place order
  68 |         await checkoutPage.placeOrder();
  69 |         const thankYouPage = poManager.getThankYouPage();
  70 |         // Assert confirmation message
  71 |         await expect(thankYouPage.confirmationMessage).toBeVisible();
  72 |         // Capture Order ID
  73 |         const orderId = await thankYouPage.getOrderIdCleanedUp();
  74 |         // Go to Orders History Page
  75 |         await thankYouPage.navigateToOrdersHistoryPage();
  76 |         // View order
  77 |         const ordersHistoryPage = poManager.getOrdersHistoryPage();
  78 |         await expect(await ordersHistoryPage.getOrderIdCellLocator(orderId)).toBeVisible();
  79 |         await ordersHistoryPage.table.waitFor();
  80 |         await ordersHistoryPage.viewOrderById(orderId)
  81 | 
  82 |         // Verify order summary page
  83 |         await ordersHistoryPage.vadidateOrder(data.username, data.country, orderId);
  84 | 
  85 |     }
  86 |     );
  87 | }
  88 | 
  89 | 
```