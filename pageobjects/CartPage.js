class CartPage {
    constructor(page) {
        this.page = page;
        this.myCartHeading = page.getByRole("heading", { name: 'My Cart'});
        //this.productInCart = page.locator("h3:has-text('ZARA COAT 3')");
        this.checkoutButton = page.getByRole('button', { name: 'Checkout❯' });
    }

    async waitForCartPageLoading() {
        await this.myCartHeading.waitFor();
    }

    async checkout() {
        await this.checkoutButton.click();
    }
}

module.exports = { CartPage };