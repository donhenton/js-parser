Feature: Tests for Tree Parse
    The tree parser should work
    
Scenario: Tree Parser should handle single element
Given The treeParser is loaded with "A"
Then The parser should be not null
Then The result should be equal