Feature: Ecommerce validations

  @Validation
  @foo
  Scenario Outline: Placing the order
    Given A login to ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
        | username            | password     | 
        | yassin008@test.com  | Testing123!  |
        | test@test.com       | Test1245!@   |