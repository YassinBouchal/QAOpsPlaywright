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
const fakePayloadOrders = { data: [], message: "No Orders" };

const url = "https://rahulshettyacademy.com/client";

let response;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(createOrderPayload);
    console.log(response.token);

});

test('Security test request intercept', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);

    await page.goto(url);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        console.log("rowOrderId = " + rowOrderId)

        // GET https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6ae83e5a92a4341c4cfd4ab4
        //const requestUrl = `https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=${response.orderId}`
        await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
            route => route.continue(
                {
                    url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6adf4cf3a90a419aa82b6437"
                }
            )
        );

        if (rowOrderId === response.orderId) {
            await rows.nth(i).locator("text=View").click();
            break;
        }
    };

    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");


});