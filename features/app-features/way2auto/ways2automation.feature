@web @regression
Feature: Ways2Automation Login
  Scenario Outline: Logging into way2Automation site 
    Given I am on the waytoAutomation login page
    When I login using <username> and <password>
    Then I should see the results displayed

    Examples: 
      | username   | password |
      | test 	   | test     |