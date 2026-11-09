const base = require('@playwright/test');

exports.customtest = base.test.extend({
    testDataForOrder: async ({}, use) => {
        await use({
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
        });
    }
});

exports.expect = base.expect;