const defineSupportCode = require('cucumber').defineSupportCode;
const expect = require('chai').expect;
import TreeParser from './../../../src/code/parser/treeParser';
import {Given, When, Then} from 'cucumber';

 

  
  let treeParser = null;

//Given The parse is loaded with 'A'
//Then The result should be equal to <''{"property":"A"}''>

  Given('The treeParser is loaded with "A"', function () {
    treeParser = new TreeParser('A');
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