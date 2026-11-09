# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ClientAppOtherWay.spec.js >> End to end product order test
- Location: tests\ClientAppOtherWay.spec.js:48:1

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
    - row "6aeaeddf92a4341c4c02abc8 iphone 13 pro $ 55000 Wed Nov 04 View Delete":
      - rowheader "6aeaeddf92a4341c4c02abc8"
      - cell:
        - img
      - cell "iphone 13 pro"
      - cell "$ 55000"
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
  62  |     await login.click();
  63  | 
  64  |     await page.locator('.card-body').first().waitFor();
  65  |     await page.locator('.card-body').filter({hasText: 'ZARA COAT 3'})
  66  |         .getByRole("button", {name: ' Add To Cart'}).click();
  67  | 
  68  |     
  69  |     await page.getByRole("listitem").getByRole("button", {name: 'Cart'}).click();
  70  | 
  71  |     await page.locator("div li").first().waitFor();
  72  |     await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  73  | 
  74  |     await page.getByRole("button", {name: 'Checkout'}).click();
  75  | 
  76  | 
  77  | 
  78  |     // Enter credit card information
  79  |     //4542 9931 9292 2293
  80  |     const creditCardNumber = "1111 2222 3333 4444";
  81  |     const cvvCode = "123";
  82  |     const name = "Yassin Testing";
  83  | 
  84  |     const creditCardTitle = page.getByText('Credit Card Number');
  85  |     await creditCardTitle.locator('//following-sibling::input').fill(creditCardNumber);
  86  | 
  87  |     const cvvCodeCard = page.getByText('CVV Code ?');
  88  |     await cvvCodeCard.locator('//following-sibling::input').fill(cvvCode);
  89  | 
  90  |     const nameOnCard = page.getByText('Name on Card');
  91  |     await nameOnCard.locator('//following-sibling::input').fill(name);
  92  | 
  93  |     const month = page.locator(".input.ddl").first();
  94  |     const year = page.locator(".input.ddl").last();
  95  |     await month.selectOption("05");
  96  |     await year.selectOption("30");
  97  | 
  98  |     // Verify shipping info + select country
  99  |     await expect(page.locator("//label[@type='text']")).toHaveText(userEmail);
  100 |     const countryDropdown = page.getByPlaceholder("Select Country");
  101 |     const country = "Belgium";
  102 |     await countryDropdown.pressSequentially("Be");
  103 |     //await page.pause();
  104 |     /* await page.locator(`//span[contains(text(),'${country}')]`).waitFor();
  105 |     await page.locator(`//span[contains(text(),'${country}')]`).click(); */
  106 |     // or rahulshetty version - identify results box and wait for it to be shown before clicking on the option (country)
  107 |     const dropdown = page.locator(".ta-results");
  108 |     await dropdown.waitFor();
  109 |     const optionsCount = await dropdown.locator("button").count();
  110 |     console.log(optionsCount.toString());
  111 | 
  112 |     await page.getByRole("button", {name: country}).click();   
  113 | 
  114 |    
  115 |     // Apply coupon
  116 |     const coupon = "rahulshettyacademy"
  117 |     await page.locator("[name='coupon']").fill(coupon);
  118 | 
  119 | 
  120 |     await page.getByRole("button", {name: 'Apply Coupon'}).click();
  121 | 
  122 |     const couponApplied = page.getByText("* Coupon Applied");
  123 |     await expect(couponApplied).toBeVisible();
  124 |     
  125 |     // Place order
  126 |     //await page.getByRole("link", {name: 'PLACE ORDER'}).click();
  127 |     await page.getByText("PLACE ORDER").click();
  128 | 
  129 |     // Assert confirmation message
  130 |     await expect(page.getByText("Thankyou for the order.")).toBeVisible();
  131 | 
  132 |     // Capture Order ID
  133 |     const orderId = await page.locator("//label[contains(text(),'|')]").textContent();
  134 |     const orderIdCleanedUp = orderId.toString().substring(3, 27);
  135 |     console.log(orderId);
  136 |     console.log(orderIdCleanedUp);
  137 | 
  138 |     // Go to Orders History Page
  139 |     await page.getByText('Orders History Page').click();
  140 | 
  141 |     // View order
  142 |     await expect(page.getByText(orderIdCleanedUp)).toBeVisible();
  143 | 
  144 |     //await page.getByRole('button', { name: 'View' }).first().click();
  145 | 
  146 |     // wait for table to show up because next method which is count is not auto waiting
  147 |     await page.locator("tbody").waitFor();
  148 |     
  149 |     const rows = page.locator("tbody tr");
  150 | 
  151 |     for(let i = 0; i < await rows.count(); i++) {
  152 |         const rowOrderId = await rows.nth(i).locator("th").textContent();
  153 |         console.log("rowOrderId = " + rowOrderId)
  154 |         
  155 |         if (rowOrderId === orderIdCleanedUp) {
  156 |             await rows.nth(i).getByText("View").click();
  157 |             break;
  158 |         }
  159 |     }
  160 | 
  161 |     // Verify order summary page
> 162 |     await expect(page.locator('app-order-details')).toContainText(userEmail);
      |                                                     ^ Error: expect(locator).toContainText(expected) failed
  163 |     await expect(page.locator('app-order-details')).toContainText(country);
  164 |     await expect(page.locator('app-order-details')).toContainText(orderIdCleanedUp);
  165 | 
  166 |     //await page.pause();
  167 | }
  168 | );
  169 | 
  170 | 
  171 | test('Codegen Test', async ({ page }) => {
  172 |   await page.goto('https://rahulshettyacademy.com/angularpractice/');
  173 |   await page.getByRole('link', { name: 'Shop' }).click();
  174 |   await page.locator('app-card').filter({ hasText: 'iphone X $24.99 Lorem ipsum' }).getByRole('button').click();
  175 |   await page.locator('app-card').filter({ hasText: 'Samsung Note 8 $24.99 Lorem' }).getByRole('button').click();
  176 |   await page.getByText('Checkout ( 2 ) (current)').click();
  177 |   await page.getByRole('button', { name: 'Checkout' }).click();
  178 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).click();
  179 |   await page.getByRole('textbox', { name: 'Please choose your delivery' }).pressSequentially('belgium');
  180 |   await page.getByText('Belgium').click();
  181 |   await page.getByText('I agree with the term &').click();
  182 |   await page.getByRole('checkbox', { name: 'I agree with the term &' }).check();
  183 |   await page.getByRole('button', { name: 'Purchase' }).click();
  184 |   await expect(page.locator('app-checkout')).toContainText('Please choose your delivery location. Then click on purchase button');
  185 |   await expect(page.getByText('× Success! Thank you! Your')).toBeVisible();
  186 |   await expect(page.getByRole('textbox', { name: 'Please choose your delivery' })).toHaveValue('Belgium');
  187 | });
```