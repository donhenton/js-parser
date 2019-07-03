const defineSupportCode = require('cucumber').defineSupportCode;
const expect = require('chai').expect;
import TreeParser from './../../../src/code/parser/treeParser';


defineSupportCode(function ( {Given, Then, When}) {

  
  let treeParser = null;

//Given The parse is loaded with 'A'
//Then The result should be equal to <''{"property":"A"}''>

  Given('The treeParser is loaded with "A"', function () {
    treeParser = new TreeParser('A');
  })

  Then('The result should be equal to {input}', function (input) {
    expect(input).toEqual(JSON.stringify(treeParser.getTree()));
  });


})

