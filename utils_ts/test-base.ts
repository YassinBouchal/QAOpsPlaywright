const base = require('@playwright/test');
import { test as baseTest } from '@playwright/test'

interface TestDataForOrder {
    id: number,
    username: string,
    password: string,
    productName: string,
    creditCardInformation: {
        creditCardNumber: string,
        cvvCode: string,
        cardHolder: string,
        monthExpiryDate: string,
        yearExpiryDate: string
    },
    country: string,
    coupon: string
}

export const customtest = baseTest.extend<{testDataForOrder: TestDataForOrder}>({
    testDataForOrder: {
        
            id: 1,
            username: "yassin008@test.com",
            password: "Testing123!",
            productName: "ZARA COAT 3",
            creditCardInformation: {
                creditCardNumber: "1111 2222 3333 4444",
                cvvCode: "123",
                cardHolder: "Yassin Testing",
                monthExpiryDate: "01",
                yearExpiryDate: "30"
            },
            country: "Belgium",
            coupon: "rahulshettyacademy"
        }
    });

exports.expect = base.expect;