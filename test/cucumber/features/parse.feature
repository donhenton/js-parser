Feature: Tests for Tree Parse
    The tree parser should work
    
Scenario: Tree Parser should handle single element
Given The treeParser is loaded with "A"
Then The parser should be not null
Then The result should be equal

Scenario: Tree Parser should handle single element with parans
Given The treeParser is loaded with A in parentheses
Then the result should also be equal

Scenario Outline: The Tree Parser should process the following correctly
    Given input is "<input>" and the parser is set up
    Then it should yield a result of  "<result>"

  Examples:
    | input          |result |
    | A OR B OR C    | {\"op\":\"OR\",\"left\":{\"op\":\"OR\",\"left\":{\"property\":\"A\"},\"right\":{\"property\":\"B\"}},\"right\":{\"property\":\"C\"}}  |
    | (A OR B) AND C | {\"op\":\"AND\",\"left\":{\"op\":\"OR\",\"left\":{\"property\":\"A\"},\"right\":{\"property\":\"B\"}},\"right\":{\"property\":\"C\"}} |
    | 45 AND 37      | {\"op\":\"AND\",\"left\":{\"property\":\"45\"},\"right\":{\"property\":\"37\"}} |


Scenario Outline: The Tree Parser should be able to handle error conditions
    Given erroneous input of "<error_input>" and the parser is set up
    Then an error should be thrown with message of "<error_message>"

  Examples:
    |error_input|error_message|
    |45 snort 37 | something went wrong |
    |AND|invalid node passed|
    |NOT|invalid node passed|
    |A & B  | unexpected token '&' | 

