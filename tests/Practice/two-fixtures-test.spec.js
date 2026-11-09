// Exercice : Build a Two-Fixture Test — Login Fixture + Event Creation Fixture
const { expect } = require('@playwright/test');
const { eventhubtest } = require('../../utils/fixtures');


eventhubtest("Two-Fixture Test", async({authenticatedPage, createEvent}) => {

    await authenticatedPage.getByTestId('nav-events').click();
    await expect(authenticatedPage.getByRole('article').filter({ hasText: createEvent.title })).toBeVisible();
});