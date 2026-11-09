const { test, expect, request } = require('@playwright/test');
const { ApiUtilsEventHub } = require('../../utils/ApiUtilsEventHub');


const BASE_URL = 'https://eventhub.rahulshettyacademy.com';

const USER_EMAIL_YAHOO = 'eventhub211@yahoo.com';
const USER_EMAIL_GMAIL = 'eventhub211@gmail.com';
const USER_PASSWORD = 'Testing123!';

const yahooLoginPayload = {
  email: USER_EMAIL_YAHOO,
  password: USER_PASSWORD,
};

const loginAs = async (page, email) => {
  await page.goto(BASE_URL);

  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Password' }).fill(USER_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(
    page.getByTestId('user-email-display')
  ).toBeVisible();
};

let yahooBookingId;

test.beforeAll(async () => {
  const apiContext = await request.newContext();

  const apiUtils = new ApiUtilsEventHub(
    apiContext,
    yahooLoginPayload
  );

  const token = await apiUtils.getToken();

  const eventId = await apiUtils.getFirstEventId(
    token
  );

  yahooBookingId = await apiUtils.createBooking(
    token,
    eventId,
    USER_EMAIL_YAHOO
  );

  console.log(`Created booking id: ${yahooBookingId}`);
});

test('Gmail user cannot access Yahoo booking', async ({
  page,
}) => {
  // Login as Gmail user
  await loginAs(page, USER_EMAIL_GMAIL);

  // Navigate directly to Yahoo booking
  await page.goto(
    `${BASE_URL}/bookings/${yahooBookingId}`,
    {
      waitUntil: 'networkidle',
    }
  );

  // Validate access denied
  await expect(
    page.getByRole('heading', {
      name: 'Access Denied',
    })
  ).toBeVisible();

  await expect(
    page.getByText(
      'You are not authorized to view this booking'
    )
  ).toBeVisible();
});