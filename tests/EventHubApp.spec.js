import test, { expect } from "@playwright/test";


test("Booking Flow with Event Creation", { tag: '@Practice' }, async ({ page }) => {
    // 1. Login
    const email = "eventhub@test.com";
    const password = "Testing123!";
    const totalSeats = '1000';

    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.getByTestId('user-email-display')).toBeVisible();

    // 2. Create a new event from the admin panel
    await page.getByRole("button", { name: 'Admin' }).click();
    // Scoped to the navigation menu to avoid matching the footer link.
    await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();

    const eventTitle = `Monkey Madness Quest - ${Date.now()}`;
    await page.getByTestId('event-title-input').fill(eventTitle);
    await page.getByRole('textbox', { name: 'Describe the event…' }).fill('Runescape Global Quest Event 2026');
    await page.getByLabel('Category*').selectOption('Festival');
    await page.getByRole('textbox', { name: 'City*' }).fill('London');
    await page.getByRole('textbox', { name: 'Venue*' }).fill('5th Albert Crampton Avenue');
    await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill('2027-01-01T15:00');
    await page.getByRole('spinbutton', { name: 'Price ($)*' }).fill('750');
    await page.getByRole('spinbutton', { name: 'Total Seats*' }).fill(totalSeats);
    await page.getByTestId('add-event-btn').click();
    await expect(page.getByText('✓Event created!×')).toBeVisible();
    //await expect(page.getByRole('cell', { name: 'Monkey Madness' })).toBeVisible();

    // 3. Book an event and verify seat count drops by exactly 1
    await page.getByTestId('nav-events').click();
    await page.getByRole('article').filter({ hasText: eventTitle }).getByTestId('book-now-btn').click();
    await expect(page.getByText('Events/Monkey Madness Quest')).toBeVisible();
    await page.getByRole('textbox', { name: 'Full Name*' }).fill('Best Tester');
    await page.getByTestId('customer-email').fill('eventhub@test.com');
    await page.getByRole('textbox', { name: 'Phone Number*' }).fill('0487123456');
    await page.getByRole('button', { name: 'Confirm Booking' }).click();
    await expect(page.getByRole('heading', { name: 'Booking Confirmed!' })).toBeVisible();
    await page.getByTestId('nav-events').click();
    await expect(page.getByRole('main')).toContainText('999 seats available');

    // Delete booking
    await page.getByRole('navigation').getByRole("link", { name: 'My Bookings' }).click();
    //await page.getByTestId('cancel-booking-btn').click();
    //await page.getByTestId('cancel-booking-btn').filter({ hasText: })
    //getByRole('heading', { name: 'Monkey Madness Quest - 1793375093604' })
    await expect(page.getByTestId("booking-card").first()).toBeVisible();
    const bookingToCancel = page.getByTestId("booking-card").filter({ hasText: eventTitle });

    await bookingToCancel.getByTestId('cancel-booking-btn').click();
    await page.getByTestId('confirm-dialog-yes').click();
    await expect(page.getByText('✓Booking cancelled')).toBeVisible();


});

// Exercices
const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const USER_EMAIL = "eventhub@test.com";
const USER_PASSWORD = "Testing123!";

const login = async (page) => {
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.getByPlaceholder("you@email.com").fill(USER_EMAIL);
    await page.getByLabel('Password').fill(USER_PASSWORD);
    await page.locator('#login-btn').click();
    await expect(page.getByText('Browse Events →')).toBeVisible();
};

const futureDateValue = () => {
    const todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + 100);
    return todayDate.toISOString().slice(0, 16);
};


test("Full Booking Flow with Event Creation", { tag: '@Practice' }, async ({ page }) => {
    // Step 1 — Login
    await login(page);

    // Step 2 — Create a new event
    await page.getByRole("button", { name: 'Admin' }).click();
    // Scoped to the navigation menu to avoid matching the footer link.
    await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();

    const eventTitle = `Monkey Madness Quest - ${Date.now()}`;
    await page.getByTestId('event-title-input').fill(eventTitle);
    await page.locator("#admin-event-form textarea").fill('Runescape Global Quest Event 2026');
    await page.getByLabel('Category*').selectOption('Festival');
    await page.getByLabel('City').fill('London');
    await page.getByLabel('Venue').fill('5th Albert Crampton Avenue');
    await page.getByLabel('Event Date & Time').fill(futureDateValue());
    await page.getByLabel('Price ($)').fill('750');
    await page.getByLabel('Total Seats').fill('50');
    await page.getByTestId('add-event-btn').click();
    await expect(page.getByText('Event created!')).toBeVisible();

    // Step 3 — Find the event card and capture seats
    await page.getByTestId('nav-events').click();
    const allEventsCards = page.locator('[data-testid="event-card"]');
    await expect(allEventsCards.first()).toBeVisible();
    console.log("Before filter = " + await allEventsCards.count());
    const eventCard = allEventsCards.filter(({ hasText: eventTitle }));
    console.log("After filter = " + await eventCard.count());
    await expect(eventCard).toBeVisible({ timeout: 5_000 }); // not needed here but just for exercice

    const seatsAvailable = await eventCard.getByText("seats").textContent();
    const seatsBeforeBooking = parseInt((seatsAvailable.split(" "))[0]);
    console.log("IsInteger = " + Number.isInteger(seatsBeforeBooking));

    // Step 4 — Start booking
    await eventCard.locator('[data-testid="book-now-btn"]').click();

    // Step 5 — Fill booking form
    await expect(page.locator('#ticket-count')).toHaveText("1");
    await page.getByLabel('Full Name').fill('Best Tester');
    await page.getByTestId('customer-email').fill('eventhub@test.com');
    await page.getByPlaceholder('+91 98765 43210').fill('0487123456');
    await page.locator('.confirm-booking-btn').click();

    // Step 6 — Verify booking confirmation
    const bookingRef = (await page.locator('.booking-ref').first().textContent()).trim();
    console.log(bookingRef);
    await expect(page.locator('.booking-ref').first()).toBeVisible();


    // Step 7 — Verify in My Bookings
    await page.getByRole("button", { name: 'View My Bookings' }).waitFor();
    await page.getByRole("button", { name: 'View My Bookings' }).click();
    await expect(page).toHaveURL((`${BASE_URL}/bookings`));
    const allBookingCards = page.locator("#booking-card");
    await expect(allBookingCards.first()).toBeVisible();
    const bookingCard = allBookingCards.filter(({ hasText: bookingRef }));
    await expect(bookingCard).toBeVisible();
    await expect(bookingCard.locator("h3")).toHaveText(eventTitle);

    // Step 8 — Verify seat reduction
    // wait until the call is completed - needed here to avoid async issues
    await Promise.all([
        page.waitForResponse(response =>
            response.url().includes('/api/events') &&
            response.status() === 200
        ),
        page.getByTestId('nav-events').click()
    ]);
    

    await expect(allEventsCards.first()).toBeVisible();
    const eventCardAfterBooking = allEventsCards.filter(({ hasText: eventTitle }));
    console.log("eventCardAfterBooking = " + await eventCardAfterBooking.count());
    await expect(eventCardAfterBooking).toBeVisible({ timeout: 5_000 }); // not needed here but just for exercice
    

    const seatsAvailableAfterBooking = await eventCardAfterBooking.getByText("seats").textContent();
    const seatsAfterBooking = parseInt((seatsAvailableAfterBooking.split(" "))[0]);
    console.log("SeatsBeforeBooking = " + seatsBeforeBooking);
    console.log("SeatsAfterbooking = " + seatsAfterBooking);

    expect(seatsAfterBooking).toBe(seatsBeforeBooking -1);

});

test("Test 1 - Single ticket booking is eligible for refund", async({page})=>{
    // Step 1 — Login
    await login(page);

    // Step 2 — Book first event with 1 ticket (default)
    await page.getByTestId('nav-events').click();
    const firstEventCard = page.locator('[data-testid="event-card"]').first();
    await expect(firstEventCard.first()).toBeVisible();
    await firstEventCard.getByTestId("book-now-btn").click();
    await page.getByLabel('Full Name').fill('Best Tester');
    await page.getByTestId('customer-email').fill('eventhub@test.com');
    await page.getByPlaceholder('+91 98765 43210').fill('0487123456');
    await page.locator('.confirm-booking-btn').click();

    // Step 3 — Navigate to booking detail
    await page.getByRole("button", { name: 'View My Bookings' }).waitFor();
    await page.getByRole("button", { name: 'View My Bookings' }).click();
    await expect(page).toHaveURL((`${BASE_URL}/bookings`));
    const firstBookingCard = page.getByTestId("booking-card").first();
    await expect(firstBookingCard).toBeVisible();
    await firstBookingCard.getByRole("link", { name: 'View Details'}).click();
    await expect(page.getByRole("heading", { name: 'Booking Information'})).toBeVisible();

    // Step 4 — Validate booking ref
    const bookingRef = await page.getByText('-').first().textContent();
    const eventTitle = await page.locator("h1").textContent();
    expect(bookingRef.charAt(0)).toBe(eventTitle.trim().charAt(0).toUpperCase());

    // Step 5 — Check refund eligibility
    const refundEligibilityBtn = page.getByTestId("check-refund-btn");
    await refundEligibilityBtn.click();
    const loadingSpinner = page.locator("#refund-spinner");
    await expect(loadingSpinner).toBeVisible({timeout: 100});
    await expect(loadingSpinner).not.toBeVisible({timeout: 6_000});

    // Step 6 — Validate result
    const refundResult = page.getByTestId("refund-result");
    await expect(refundResult).toBeVisible();
    await expect(refundResult).toContainText("Eligible for refund");
    await expect(refundResult).toContainText("Single-ticket bookings qualify for a full refund");

});

test("Test 2 - Group ticket booking is NOT eligible for refund", async({page})=>{
    // Step 1 — Login
    await login(page);

    // Step 2 — Book first event with 1 ticket (default)
    await page.getByTestId('nav-events').click();
    const firstEventCard = page.locator('[data-testid="event-card"]').first();
    await expect(firstEventCard.first()).toBeVisible();
    await firstEventCard.getByTestId("book-now-btn").click();
    //await page.locator('button:has-text("+")').dblclick(); // risk of flakiness
    await page.locator('button:has-text("+")').click();
    await page.locator('button:has-text("+")').click();
    await page.getByLabel('Full Name').fill('Best Tester');
    await page.getByTestId('customer-email').fill('eventhub@test.com');
    await page.getByPlaceholder('+91 98765 43210').fill('0487123456');
    await page.locator('.confirm-booking-btn').click();

    // Step 3 — Navigate to booking detail
    await page.getByRole("button", { name: 'View My Bookings' }).waitFor();
    await page.getByRole("button", { name: 'View My Bookings' }).click();
    await expect(page).toHaveURL((`${BASE_URL}/bookings`));
    const firstBookingCard = page.getByTestId("booking-card").first();
    await expect(firstBookingCard).toBeVisible();
    await firstBookingCard.getByRole("link", { name: 'View Details'}).click();
    await expect(page.getByRole("heading", { name: 'Booking Information'})).toBeVisible();

    // Step 4 — Validate booking ref
    const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
    const eventTitle = await page.locator("h1").innerText();
    expect(bookingRef.charAt(0)).toBe(eventTitle.trim().charAt(0).toUpperCase());

    // Step 5 — Check refund eligibility
    const refundEligibilityBtn = page.getByTestId("check-refund-btn");
    await refundEligibilityBtn.click();
    const loadingSpinner = page.locator("#refund-spinner");
    await expect(loadingSpinner).toBeVisible({timeout: 100});
    await expect(loadingSpinner).not.toBeVisible({timeout: 6_000});

    // Step 6 — Validate result (different assertions)
    const refundResult = page.getByTestId("refund-result");
    await expect(refundResult).toBeVisible();
    await expect(refundResult).toContainText("Not eligible for refund");
    await expect(refundResult).toContainText("Group bookings (3 tickets) are non-refundable");
});

