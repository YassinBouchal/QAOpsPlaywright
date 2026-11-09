const base = require('@playwright/test');
const { ApiUtils } = require("./ApiUtils");
const { ApiUtilsEventHub } = require("./ApiUtilsEventHub");

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


exports.customtest = base.test.extend(
    {
        authenticatedPage: async ({ browser }, use) => {
            // setup
            const context = await browser.newContext();
            const page = await context.newPage();

            await page.goto("https://rahulshettyacademy.com/client");
            const email = page.locator('#userEmail');
            const password = page.locator("#userPassword");
            const login = page.locator("[value='Login']");

            await email.fill(loginPayload.userEmail);
            await password.fill(loginPayload.userPassword);
            await login.click();
            await page.waitForLoadState('networkidle');

            await use(page);
            // after use, => teardown
            await context.close();
        },
        createOrder: async ({ }, use) => {
            // setup
            const apiContext = await base.request.newContext();
            const apiUtils = new ApiUtils(apiContext, loginPayload);
            const response = await apiUtils.createOrder(createOrderPayload);
            await use(response); // sending back the response
            await apiContext.dispose(); // teardown
        },
        testDataForOrder: {
            productName: 'ADIDAS ORIGINAL'
        }
    }

);

const USER_EMAIL_YAHOO = 'eventhub211@yahoo.com';
const USER_PASSWORD = "Testing123!";

const yahooLoginPayload = {
    email: USER_EMAIL_YAHOO,
    password: USER_PASSWORD,
};
const eventPayload = {
    title: "Katalon Summit 2026",
    description: "A premier technology conference.",
    category: "Conference",
    venue: "Brussels International Centre",
    city: "Brussels",
    eventDate: "2026-12-15T09:00:00.000Z",
    price: 1000,
    totalSeats: 500,
    imageUrl: ""
};

exports.eventhubtest = base.test.extend(
    {
        authenticatedPage: async ({ browser }, use) => {
            // setup
            const context = await browser.newContext();
            const page = await context.newPage();

            await page.goto('https://eventhub.rahulshettyacademy.com/login');
            await page.getByPlaceholder("you@email.com").fill(USER_EMAIL_YAHOO);
            await page.getByLabel('Password').fill(USER_PASSWORD);
            await page.locator('#login-btn').click();
            await page.getByText('Browse Events →').waitFor();

            await use(page);
            // after use, => teardown
            await context.close();
        },
        createEvent: async ({ }, use) => {
            // setup
            const apiContext = await base.request.newContext();
            const apiUtils = new ApiUtilsEventHub(apiContext, yahooLoginPayload);
            const token = await apiUtils.getToken();
            const event = await apiUtils.createEvent(token, eventPayload);
            await use(event.data); // sending back the response
            // teardown
            await apiContext.delete(`https://api.eventhub.rahulshettyacademy.com/api/events/${event.data.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
    }
);