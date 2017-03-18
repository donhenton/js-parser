import TreeParser from './parser/treeParser'
 
 function doParse()
 {
     
     let input = $('#inputValue').val();
     input = input.toUpperCase();
     let parser = new TreeParser(input);
     parser.parse();
     $("#logicString").html(parser.toString());
     let treeText = JSON.stringify(parser.getTree(),null,2);
     $('#treeResults').val(treeText);
     
 }
 
 $('#parseButton').bind('click',doParse);