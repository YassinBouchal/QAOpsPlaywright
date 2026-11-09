import { expect, type Locator, type Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { CartPage } from './CartPage';
import { CheckoutPage } from './CheckoutPage';
import { ThankYouPage } from './ThankYouPage';
import { OrdersHistoryPage } from './OrdersHistoryPage';


export class POManager {

    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    thankYouPage: ThankYouPage;
    ordersHistoryPage: OrdersHistoryPage;

    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);
        this.thankYouPage = new ThankYouPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getThankYouPage() {
        return this.thankYouPage;
    }

    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }
}

module.exports = { POManager };