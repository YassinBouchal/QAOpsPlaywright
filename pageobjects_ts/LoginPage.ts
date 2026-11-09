import { type Locator, type Page } from '@playwright/test';

export class LoginPage {

    page: Page;
    signInButton: Locator;
    username: Locator;
    password: Locator;

    constructor(page: Page) {
        this.page = page;
        this.signInButton = page.locator("[value='Login']");
        this.username = page.locator('#userEmail');
        this.password = page.locator("#userPassword");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async validLogin(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle'); // not recommended
    }
}

/* module.exports = { LoginPage }; */