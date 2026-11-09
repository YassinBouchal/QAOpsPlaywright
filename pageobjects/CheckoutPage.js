class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.creditCardNumber = page.getByText('Credit Card Number').locator('//following-sibling::input');
        this.cvvCode = page.getByText('CVV Code ?').locator('//following-sibling::input');
        this.cardHolder = page.getByText('Name on Card').locator('//following-sibling::input');
        this.monthExpiryDate = page.locator(".input.ddl").first();
        this.yearExpiryDate = page.locator(".input.ddl").last();
        this.dropdown = page.locator(".ta-results");
        this.countryInput = page.getByPlaceholder("Select Country");
        this.coupon = page.getByText('Apply Coupon').locator('//following-sibling::input');
        this.applyCouponButton = page.getByRole("button", { name: 'Apply Coupon' });
        this.placeOrderButton = page.getByText('Place Order ');
    }

    async fillCreditCardInformation(creditCardNumber, cvvCode, cardHolder, monthExpiryDate, yearExpiryDate) {
        await this.creditCardNumber.fill(creditCardNumber);
        await this.cvvCode.fill(cvvCode);
        await this.cardHolder.fill(cardHolder);
        await this.monthExpiryDate.selectOption(monthExpiryDate);
        await this.yearExpiryDate.selectOption(yearExpiryDate);
    }

    async selectCountry(country) {
        await this.countryInput.pressSequentially(country);
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        console.log(optionsCount.toString());

        for (let i = 0; i < optionsCount; i++) {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text.toString().includes(country)) {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }

    async applyCoupon(coupon) {
        await this.coupon.fill(coupon);
        await this.applyCouponButton.click();
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }
}

module.exports = { CheckoutPage };