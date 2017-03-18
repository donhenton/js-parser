/**
 * this is a version with a set of functions which will evaluate the tree
 * for parameters passed in
 */

//abstract base-class
class GraphNode {
    constructor() {
        Object.defineProperty(this, "parent", {
            writable: true,
            //enumerable: false,	//so it doesn't show up in JSON
            value: null
        })
    }
    compute(ctx) {
        throw new Error("not implemented")
    }
    toString() {
        throw new Error("not implemented")
    }
}

//leaf-nodes
class ValueNode extends GraphNode {
    constructor(value) {
        super();
        this.value = value + "";
    }
    compute() {
        return this.value + "";
    }
    toString() {
        return JSON.stringify(this.value);
    }
}

class PropertyNode extends GraphNode {
    constructor(property) {
        super();
        this.property = property;
    }
    compute(ctx) {
        return ctx[this.property];
    }
    toString() {
        return String(this.property);
    }
}

//tree-nodes
class UnaryNode extends GraphNode {
    constructor(op, node) {
        if (!(node instanceof GraphNode)) {
            throw new Error("invalid node passed")
        }
        super();
        this.op = op;
        this.node = node;
        node.parent = this;
    }
    compute(ctx) {
        var v = this.node.compute(ctx);
        switch (this.op) {
            case "NOT":
                return !v;
        }
        throw new Error("operator not implemented '" + this.op + "'");
    }
    toString() {
        return	"( " + this.op + " " + this.node.toString() + " )";
    }
}
UnaryNode.operators = ["NOT"];
class BinaryNode extends GraphNode {
    constructor(op, l, r) {
        if (!(l instanceof GraphNode && r instanceof GraphNode)) {
            throw new Error("invalid node passed")
        }
        super();
        this.op = op;
        this.left = l;
        this.right = r;
        l.parent = this;
        r.parent = this;
    }
    compute(ctx) {
        var l = this.left.compute(ctx);
        var r = this.right.compute(ctx);
        switch (this.op) {
            //logic operators
            case "AND":
                return l && r;
            case "OR":
                return l || r;


        }
        throw new Error("operator not implemented '" + this.logic + "'");
    }

    toString() {
        return "( " + this.left.toString() + " " + this.op + " " + this.right.toString() + " )";
    }
}
//also defines precendence
BinaryNode.operators = [
    "AND", "OR"
]


export default class TreeParser
{

    constructor(inputString)
    {
        this.inputString = inputString;
        this.tree = null;
        let self = this;

        function  escapeForRegex(str) {
            return String(str).replace(/[.*+?^=!:${}()|[\]\/\\]/g, '\\$&');
        }

        this.tokenParser = new RegExp([
            //numbers
            /\d+(?:\.\d*)?|\.\d+/.source,
            //string-literal
            //	/["](?:\\[\s\S]|[^"])+["]|['](?:\\[\s\S]|[^'])+[']/.source,

            //booleans
            //"true|false",

            //operators
            [".", "(", ")"].concat(UnaryNode.operators, BinaryNode.operators)
                    .sort((a, b) => b.length - a.length) //so that ">=" is added before "=" and ">", for example
                    .map(escapeForRegex)
                    .join("|"),
            //properties
            //has to be after the operators
            /[a-zA-Z$_][a-zA-Z0-9$_]*/.source,
            //remaining (non-whitespace-)chars, just in case
            //has to be at the end
            /\S/.source
        ].map(s => "(" + s + ")").join("|"), "g");


    }

    //dynamically build my parsing regex:


    getTree()
    {
        return this.tree;
    }

    toString()
    {
        return this.tree.toString();
    }

    getOriginalInput()
    {
        return this.inputString;
    }

    parse() {
        var tokens = [];
        //abusing str.replace() as a RegExp.forEach
        this.inputString.replace(this.tokenParser, function (token, number, op, property) {
            if (number) {
                token = new PropertyNode(number + "");
                //}else if(string){
                //	token = new ValueNode(JSON.parse(string));		
                //}else if(bool){
                //	token = new ValueNode(bool === "true");
            } else if (property) {
                token = new PropertyNode(property);
            } else if (!op) {
                throw new Error("unexpected token '" + token + "'");
            }
            tokens.push(token);
        });

        for (var i, j; (i = tokens.lastIndexOf("(")) > -1 && (j = tokens.indexOf(")", i)) > -1; ) {
            tokens.splice(i, j + 1 - i, process(tokens.slice(i + 1, j)));
        }
        if (~tokens.indexOf("(") || ~tokens.indexOf(")")) {
            throw new Error("mismatching brackets");
        }


        UnaryNode.operators.forEach(token => {
            for (var i = -i; (i = tokens.indexOf(token, i + 1)) > -1; ) {
                tokens.splice(i, 2, new UnaryNode(token, tokens[i + 1]));
            }
        })

        BinaryNode.operators.forEach(token => {
            for (var i = 1; (i = tokens.indexOf(token, i - 1)) > -1; ) {
                tokens.splice(i - 1, 3, new BinaryNode(token, tokens[i - 1], tokens[i + 1]));
            }
        });
        if (tokens.length !== 1) {
            console.log("error: ", tokens.slice());
            throw new Error("something went wrong");
        }
        this.tree = tokens[0];
    }

}