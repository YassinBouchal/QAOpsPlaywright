import { type Locator, type Page, expect} from '@playwright/test';

export class DashboardPage {

    page: Page;
    products: Locator;
    productsText: Locator;
    cart: Locator;
    numberOfItemInCart: Locator;

    constructor(page: Page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.numberOfItemInCart = page.locator("//label[text()='1']");;
    }

    async addProductToCart(productName: string) {
        await this.productsText.first().waitFor();
        const titles = await this.productsText.allTextContents();
        console.log(titles);
        const count = await this.products.count();
        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }

    }

    async navigateToCart() {
        await this.cart.click();
    }

    async validateProductInCart() {
        await expect(this.numberOfItemInCart).toHaveText('1');
    }
}

module.exports = { DashboardPage };