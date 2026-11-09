class ApiUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            });

        //expect(loginResponse.ok());
        const resLogin = await loginResponse.json();
        const token = resLogin.token;
        return token;
    }

    async createOrder(payload) {
        let response = {};
        response.token = await this.getToken();
        const createOrderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: payload,
                headers: {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                }
            });

        const resPostOrder = await createOrderResponse.json();
        const orderId = resPostOrder.orders[0];
        response.orderId = orderId;
        console.log(response);

        return response;
    }

}

module.exports = { ApiUtils };