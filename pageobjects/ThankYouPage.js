class ThankYouPage {
    constructor(page) {
        this.page = page;
        this.confirmationMessage = page.getByRole('heading', { name: 'Thankyou for the order.' });
        this.orderId = page.locator("//label[contains(text(),'|')]");
        this.ordersHistoryPageLink = page.getByText("Orders History");
    }

    async getOrderIdCleanedUp() {
        const orderIdContent = await this.orderId.textContent();
        console.log("Order ID = " + orderIdContent);
        return orderIdContent.toString().substring(3, 27);
    }

    async navigateToOrdersHistoryPage() {
        await this.ordersHistoryPageLink.click();
    }
}

module.exports = { ThankYouPage };