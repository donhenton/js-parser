const defineSupportCode = require('cucumber').defineSupportCode;
const expect = require('chai').expect;
import TreeParser from './../../../src/code/parser/treeParser';
import {Given, When, Then} from 'cucumber';

let treeParser = null;
let currentError = null;
let sampleString = null;

Given('The treeParser is loaded with {string}', function (input) {
  treeParser = new TreeParser(input);
  treeParser.parse();
})


Then('The parser should be not null', function () {

  expect(treeParser).to.not.equal(null)
});

Then('The result should be equal', function () {

  expect('{"property":"A"}').equal(JSON.stringify(treeParser.getTree()));
});

//Given The treeParser is loaded with "(A)"
//Then the result should also be equal

Given('The treeParser is loaded with A in parentheses', function () {
  treeParser = new TreeParser('(A)');
  treeParser.parse();
})
Then('the result should also be equal', function () {

  expect('{"property":"A"}').equal(JSON.stringify(treeParser.getTree()));
});



Given('input is {string} and the parser is set up', function (input) {
  treeParser = new TreeParser(input);
  treeParser.parse();
});


Then('it should yield a result of  {string}', function (testItem) {

  expect(testItem).equal(JSON.stringify(treeParser.getTree()));
});

Given('erroneous input of {string} and the parser is set up', function (input) {
  treeParser = new TreeParser(input);
  try {
    treeParser.parse();
  } catch(e) {
    currentError = e;

  }

});

Then('an error should be thrown with message of {string}', function (error) {
  // Write code here that turns the phrase above into concrete actions
   expect(currentError.message).equal(error);
});


 