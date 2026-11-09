const { expect } = require("@playwright/test");

class OrdersHistoryPage {
    constructor(page, orderId) {
        this.page = page;
        this.table = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.appOrderDetails = page.locator('app-order-details');
    }

    async viewOrderById(orderId) {
        for (let i = 0; i < await this.rows.count(); i++) {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            console.log("rowOrderId = " + rowOrderId)

            if (rowOrderId === orderId) {
                await this.rows.nth(i).locator("text=View").click();
                break;
            }
        }
    }

    async getOrderIdCellLocator(orderId) {
        return this.page.getByText(orderId);
    }

    async vadidateOrder(username, country, orderId) {
        await expect(this.appOrderDetails).toContainText(username);
        await expect(this.appOrderDetails).toContainText(country);
        await expect(this.appOrderDetails).toContainText(orderId);
    }
}

module.exports = { OrdersHistoryPage };