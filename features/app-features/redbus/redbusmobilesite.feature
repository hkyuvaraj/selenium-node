@web
Feature: RedBus Ticket Booking
  Scenario Outline: Book ticket using Redbus mobile site 
    Given I am on the redbus home page
    When I select <From> and <To>
    And I select the <traveldate>
    And I search Buses
    Then I should have available seats in the <travelsname>
    Examples: 
      | From       | To        |traveldate   | travelsname  | 
      | Coimbatore | Bangalore |30-June-2016 | Praveen      |