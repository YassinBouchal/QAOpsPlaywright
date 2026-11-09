Feature: Ecommerce validations

  @Regression
  Scenario: Placing the order
    Given A login to ecommerce application with "yassin008@test.com" and "Testing123!"
    When Add "ZARA COAT 3" item to cart
    Then Verify "ZARA COAT 3" is displayed in the cart
    When Enter valid details "1111 2222 3333 4444", "123", "Yassin Testing", "01", "30", "Belgium", "rahulshettyacademy"  and place the order
    Then Verify order is present in the Orders History Page with "yassin008@test.com", "Belgium"

  @Validation
  Scenario Outline: Placing the order
    Given A login to ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
      | username           | password    |
      | yassin008@test.com | Testing123! |