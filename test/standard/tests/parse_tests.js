/* global expect */

import TreeParser from './../../../src/code/parser/treeParser';

describe("parse_tests.js", function () {
    
    
     let v ;
     let treeParser;
     beforeEach(function () {
         treeParser = null;
         v = 45;
         
     });
    
    
    
    
    it("single element", function ()
    {
            treeParser = new TreeParser("A");
            treeParser.parse();
            expect("A").toEqual(treeParser.toString());
            expect('{"property":"A"}').toEqual(JSON.stringify(treeParser.getTree()));
        
    });
    
    it("single element take 2", function ()
    {
            treeParser = new TreeParser("(A )");
            treeParser.parse();
            expect("A").toEqual(treeParser.toString());
            expect('{"property":"A"}').toEqual(JSON.stringify(treeParser.getTree()));
        
    });
    
    it("A OR B OR C", function ()
    {
            treeParser = new TreeParser("A OR B OR C");
            treeParser.parse();
            expect("( ( A OR B ) OR C )").toEqual(treeParser.toString());
            expect('{"op":"OR","left":{"op":"OR","left":{"property":"A"},"right":{"property":"B"}},"right":{"property":"C"}}')
                    .toEqual(JSON.stringify(treeParser.getTree()));
        
    });
    
    it("A OR B AND C", function ()
    {
            treeParser = new TreeParser("A OR B AND C");
            treeParser.parse();
            expect("( A OR ( B AND C ) )").toEqual(treeParser.toString());
            expect('{"op":"OR","left":{"property":"A"},"right":{"op":"AND","left":{"property":"B"},"right":{"property":"C"}}}')
                    .toEqual(JSON.stringify(treeParser.getTree()));
        
    });
    
    it("(A OR B) AND C", function ()
    {
            treeParser = new TreeParser("(A OR B) AND C");
            treeParser.parse();
            expect( '( ( A OR B ) AND C )').toEqual(treeParser.toString());
            expect('{"op":"AND","left":{"op":"OR","left":{"property":"A"},"right":{"property":"B"}},"right":{"property":"C"}}')
                    .toEqual(JSON.stringify(treeParser.getTree()));
        
    });
    
    it("basic parser test", function ()
    {
        treeParser = new TreeParser("A AND B");
        treeParser.parse();
        
        expect('{"op":"AND","left":{"property":"A"},"right":{"property":"B"}}').toEqual(JSON.stringify(treeParser.getTree()));
    });
    
    it("basic parser test for toString", function ()
    {
        treeParser = new TreeParser("A AND B");
        treeParser.parse();
        
        expect("( A AND B )").toEqual(treeParser.toString());
    });
    
     it("basic parser test numbers", function ()
    {
        treeParser = new TreeParser("45 AND 37");
        treeParser.parse();
         
        expect('{"op":"AND","left":{"property":"45"},"right":{"property":"37"}}').toEqual(JSON.stringify(treeParser.getTree()));
    });
       
    it("bad token", function ()
    {
        treeParser = new TreeParser("45 snort 37");
        expect(function() {treeParser.parse()}).toThrow(new Error("something went wrong"));
         
        
    });
       
    it("missing brackets", function ()
    {
        treeParser = new TreeParser("45 AND (12 OR C");
        expect(function() {treeParser.parse()}).toThrow(new Error("mismatching brackets"));
         
        
    });
    
    it("binary invalid", function ()
    {
        treeParser = new TreeParser("AND");
        expect(function() {treeParser.parse()}).toThrow(new Error("invalid node passed"));
         
        
    });
    
    it("unary invalid", function ()
    {
        treeParser = new TreeParser("NOT");
        expect(function() {treeParser.parse()}).toThrow(new Error("invalid node passed"));
         
        
    });
    
    it("basic unary op simple", function ()
    {
        treeParser = new TreeParser("NOT A");
        treeParser.parse();
        
        expect('{"op":"NOT","node":{"property":"A"}}').toEqual(JSON.stringify(treeParser.getTree()));
    });  
    
    
     it("op invalid", function ()
    {
        treeParser = new TreeParser("A & B");
        expect(function() {treeParser.parse()}).toThrow(new Error("unexpected token '&'"));
         
        
    });
    
    it("basic unary op", function ()
    {
        treeParser = new TreeParser("A AND NOT (B OR C)");
        treeParser.parse();
        expect("A AND NOT (B OR C)").toEqual(treeParser.getOriginalInput());
        expect('{"op":"AND","left":{"property":"A"},"right":{"op":"NOT","node":{"op":"OR","left":{"property":"B"},"right":{"property":"C"}}}}').toEqual(JSON.stringify(treeParser.getTree()));
    });  
    
    
     it("not without paren", function ()
    {
        treeParser = new TreeParser("A AND NOT B");
        treeParser.parse();
        expect("( A AND ( NOT B ) )").toEqual(treeParser.toString());
       
    });  
    
     //NOT HANDLING
     /*
      * 
      * A AND B AND C
      * 
      * 
      * A NOT B AND C
      * 
      * 
      * 
      * 
      * 
      */
       
});
 
