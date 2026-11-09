# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppPO.spec.js >> End to end product order test for ID 1
- Location: tests\ClientAppPO.spec.js:29:5

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('app-order-details')
Expected substring: "yassin008@test.com"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" locator('app-order-details') with timeout 5000ms
  - waiting for locator('app-order-details')

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
- heading "Your Orders" [level=1]
- table:
  - rowgroup:
    - row "Order Id Product Image Name Price Ordered Date View Delete":
      - columnheader "Order Id"
      - columnheader "Product Image"
      - columnheader "Name"
      - columnheader "Price"
      - columnheader "Ordered Date"
      - columnheader "View"
      - columnheader "Delete"
  - rowgroup:
    - row "6aeb4fff92a4341c4c03b3b8 ZARA COAT 3 $ 11500 Wed Nov 04 View Delete":
      - rowheader "6aeb4fff92a4341c4c03b3b8"
      - cell:
        - img
      - cell "ZARA COAT 3"
      - cell "$ 11500"
      - cell "Wed Nov 04"
      - cell "View":
        - button "View"
      - cell "Delete":
        - button "Delete"
    - row "6aeb4fd492a4341c4c03b302 ZARA COAT 3 $ 11500 Wed Nov 04 View Delete":
      - rowheader "6aeb4fd492a4341c4c03b302"
      - cell:
        - img
      - cell "ZARA COAT 3"
      - cell "$ 11500"
      - cell "Wed Nov 04"
      - cell "View":
        - button "View"
      - cell "Delete":
        - button "Delete"
    - row "6aeb4b6792a4341c4c03a711 iphone 13 pro $ 55000 Wed Nov 04 View Delete":
      - rowheader "6aeb4b6792a4341c4c03a711"
      - cell:
        - img
      - cell "iphone 13 pro"
      - cell "$ 55000"
      - cell "Wed Nov 04"
      - cell "View":
        - button "View"
      - cell "Delete":
        - button "Delete"
    - row "6aeb4b4b92a4341c4c03a6be ZARA COAT 3 $ 11500 Wed Nov 04 View Delete":
      - rowheader "6aeb4b4b92a4341c4c03a6be"
      - cell:
        - img
      - cell "ZARA COAT 3"
      - cell "$ 11500"
      - cell "Wed Nov 04"
      - cell "View":
        - button "View"
      - cell "Delete":
        - button "Delete"
    - row "6aeb4a9e92a4341c4c03a60b ZARA COAT 3 $ 11500 Wed Nov 04 View Delete":
      - rowheader "6aeb4a9e92a4341c4c03a60b"
      - cell:
        - img
      - cell "ZARA COAT 3"
      - cell "$ 11500"
      - cell "Wed Nov 04"
      - cell "View":
        - button "View"
      - cell "Delete":
        - button "Delete"
    - row "6aeb345a92a4341c4c0372ef ZARA COAT 3 $ 11500 Wed Nov 04 View Delete":
      - rowheader "6aeb345a92a4341c4c0372ef"
      - cell:
        - img
      - cell "ZARA COAT 3"
      - cell "$ 11500"
      - cell "Wed Nov 04"
      - cell "View":
        - button "View"
      - cell "Delete":
        - button "Delete"
    - row "6aeb21b392a4341c4c033abd ZARA COAT 3 $ 11500 Wed Nov 04 View Delete":
      - rowheader "6aeb21b392a4341c4c033abd"
      - cell:
        - img
      - cell "ZARA COAT 3"
      - cell "$ 11500"
      - cell "Wed Nov 04"
      - cell "View":
        - button "View"
      - cell "Delete":
        - button "Delete"
- text: "* If orders Will be more than 7 your last order will get deleted"
- button "Go Back to Shop"
- button "Go Back to Cart"
```

# Test source

```ts
  1  | const { expect } = require("@playwright/test");
  2  | 
  3  | class OrdersHistoryPage {
  4  |     constructor(page, orderId) {
  5  |         this.page = page;
  6  |         this.table = page.locator("tbody");
  7  |         this.rows = page.locator("tbody tr");
  8  |         this.appOrderDetails = page.locator('app-order-details');
  9  |     }
  10 | 
  11 |     async viewOrderById(orderId) {
  12 |         for (let i = 0; i < await this.rows.count(); i++) {
  13 |             const rowOrderId = await this.rows.nth(i).locator("th").textContent();
  14 |             console.log("rowOrderId = " + rowOrderId)
  15 | 
  16 |             if (rowOrderId === orderId) {
  17 |                 await this.rows.nth(i).locator("text=View").click();
  18 |                 break;
  19 |             }
  20 |         }
  21 |     }
  22 | 
  23 |     async getOrderIdCellLocator(orderId) {
  24 |         return this.page.getByText(orderId);
  25 |     }
  26 | 
  27 |     async vadidateOrder(username, country, orderId) {
> 28 |         await expect(this.appOrderDetails).toContainText(username);
     |                                            ^ Error: expect(locator).toContainText(expected) failed
  29 |         await expect(this.appOrderDetails).toContainText(country);
  30 |         await expect(this.appOrderDetails).toContainText(orderId);
  31 |     }
  32 | }
  33 | 
  34 | module.exports = { OrdersHistoryPage };
```