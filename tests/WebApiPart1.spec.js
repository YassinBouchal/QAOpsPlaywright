import { test, expect, request } from "@playwright/test";
import { ApiUtils } from "../utils/ApiUtils";

const loginPayload = {
    userEmail: "yassin008@test.com",
    userPassword: "Testing123!"
};

const createOrderPayload = {
    orders: [
        {
            country: "Belgium",
            productOrderedId: "6960eae1c941646b7a8b3ed3"
        }
    ]
};

const url = "https://rahulshettyacademy.com/client";

let response;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(createOrderPayload);
    console.log(response.token);
    
});

test.beforeEach(async ({ page }) => {
    /* await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token); */
});

test('@API Client App login', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);
    
    await page.goto(url);
    const cardTitlesExample = page.locator('.card-body b');
    await cardTitlesExample.first().waitFor();
    const titles = await cardTitlesExample.allTextContents();
    console.log(titles);
}
);

test('@API Place an order', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);

    await page.goto(url);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");

    for(let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        console.log("rowOrderId = " + rowOrderId)
        
        if (rowOrderId === response.orderId) {
            await rows.nth(i).locator("text=View").click();
            break;
        }
    }


});