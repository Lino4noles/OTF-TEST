@2WaySMS
Feature: OTF 2 Way SMS
  As a prospective Orangetheory Fitness customer,
  I want to send messages directly to studio staff via SMS,
  So that I can ask questions or arrange next steps without signing up for a class immediately

  @SIT
  Scenario Outline: Navigate to page
    Given The user is navigate on "<page>" page

    Examples:
      | page  |
      | Home  |