const { expect } = require('@playwright/test');

const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

class ApiUtilsEventHub {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      `${API_URL}/auth/login`,
      {
        data: this.loginPayload,
      }
    );

    expect(loginResponse.ok()).toBeTruthy();

    const loginData = await loginResponse.json();
    return loginData.token;
  }

  async createEvent(token, payload) {
    const eventResponse = await this.apiContext.post(
      `${API_URL}/events`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: payload
      }
    );

    expect(eventResponse.ok()).toBeTruthy();

    const eventData = await eventResponse.json();
    return eventData;
  }

  async getFirstEventId(token) {
    const eventsResponse = await this.apiContext.get(
      `${API_URL}/events`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    expect(eventsResponse.ok()).toBeTruthy();

    const eventsData = await eventsResponse.json();
    return eventsData.data[0].id;
  }

  async createBooking(token, eventId, email) {
    const bookingResponse = await this.apiContext.post(
      `${API_URL}/bookings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          eventId,
          customerName: 'Yahoo User',
          customerEmail: email,
          customerPhone: '0487123999',
          quantity: 1,
        },
      }
    );

    expect(bookingResponse.ok()).toBeTruthy();

    const bookingData = await bookingResponse.json();
    return bookingData.data.id;
  }
}

module.exports = { ApiUtilsEventHub };