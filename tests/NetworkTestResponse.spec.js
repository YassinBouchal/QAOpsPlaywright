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

test('Intercept Response call', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);

    await page.goto(url);

    // GET https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6ad75aa593b084c41f5c0e10
    // Use /* to avoid failing test because of invalid or changing id, now it accepts everything
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            // intercepting the response and plawright fake the response
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrders); // payload is expecting a json
            route.fulfill(
                {
                    response,
                    body
                }
            )
        }
    );


    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator(".mt-4").textContent());


});