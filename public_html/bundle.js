!function e(r,t,n){function o(s,u){if(!t[s]){if(!r[s]){var a="function"==typeof require&&require;if(!u&&a)return a(s,!0);if(i)return i(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var f=t[s]={exports:{}};r[s][0].call(f.exports,function(e){var t=r[s][1][e];return o(t?t:e)},f,f.exports,e,r,t,n)}return t[s].exports}for(var i="function"==typeof require&&require,s=0;s<n.length;s++)o(n[s]);return o}({"/Users/dhenton/responsive/js-parser/src/code/index.js":[function(e,r,t){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(){var e=$("#inputValue").val();e=e.toUpperCase();var r=new s["default"](e);try{r.parse(),$("#logicString").html(r.toString());var t=JSON.stringify(r.getTree(),null,2);$("#treeResults").val(t)}catch(n){$("#logicString").html("<b>Error:</b> "+n.message)}}var i=e("./parser/treeParser"),s=n(i);$("#parseButton").bind("click",o)},{"./parser/treeParser":"/Users/dhenton/responsive/js-parser/src/code/parser/treeParser.js"}],"/Users/dhenton/responsive/js-parser/src/code/parser/treeParser.js":[function(e,r,t){"use strict";function n(e,r){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!r||"object"!=typeof r&&"function"!=typeof r?e:r}function o(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function, not "+typeof r);e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),r&&(Object.setPrototypeOf?Object.setPrototypeOf(e,r):e.__proto__=r)}function i(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(r,t,n){return t&&e(r.prototype,t),n&&e(r,n),r}}(),u=function(){function e(){i(this,e),Object.defineProperty(this,"parent",{writable:!0,value:null})}return s(e,[{key:"toString",value:function(){throw new Error("not implemented")}}]),e}(),a=function(e){function r(e){i(this,r);var t=n(this,(r.__proto__||Object.getPrototypeOf(r)).call(this));return t.property=e,t}return o(r,e),s(r,[{key:"toString",value:function(){return String(this.property)}}]),r}(u),c=function(e){function r(e,t){if(i(this,r),!(t instanceof u))throw new Error("invalid node passed");var o=n(this,(r.__proto__||Object.getPrototypeOf(r)).call(this));return o.op=e,o.node=t,t.parent=o,o}return o(r,e),s(r,[{key:"toString",value:function(){return"( "+this.op+" "+this.node.toString()+" )"}}]),r}(u);c.operators=["NOT"];var f=function(e){function r(e,t,o){if(i(this,r),!(t instanceof u&&o instanceof u))throw new Error("invalid node passed");var s=n(this,(r.__proto__||Object.getPrototypeOf(r)).call(this));return s.op=e,s.left=t,s.right=o,t.parent=s,o.parent=s,s}return o(r,e),s(r,[{key:"toString",value:function(){return"( "+this.left.toString()+" "+this.op+" "+this.right.toString()+" )"}}]),r}(u);f.operators=["AND","OR"];var p=function(){function e(r){function t(e){return String(e).replace(/[.*+?^=!:${}()|[\]\/\\]/g,"\\$&")}i(this,e),this.inputString=r,this.tree=null;this.tokenParser=new RegExp([/\d+(?:\.\d*)?|\.\d+/.source,[".","(",")"].concat(c.operators,f.operators).sort(function(e,r){return r.length-e.length}).map(t).join("|"),/[a-zA-Z$_][a-zA-Z0-9$_]*/.source,/\S/.source].map(function(e){return"("+e+")"}).join("|"),"g")}return s(e,[{key:"getTree",value:function(){return JSON.parse(JSON.stringify(this.tree))}},{key:"toString",value:function(){return this.tree.toString()}},{key:"getOriginalInput",value:function(){return this.inputString}},{key:"process",value:function(e){if(c.operators.forEach(function(r){for(var t=-t;(t=e.indexOf(r,t+1))>-1;)e.splice(t,2,new c(r,e[t+1]))}),f.operators.forEach(function(r){for(var t=1;(t=e.indexOf(r,t-1))>-1;)e.splice(t-1,3,new f(r,e[t-1],e[t+1]))}),1!==e.length)throw console.log("error: ",e.slice()),new Error("something went wrong");return e[0]}},{key:"parse",value:function(){var e=[];this.inputString.replace(this.tokenParser,function(r,t,n,o){if(t)r=new a(t+"");else if(o)r=new a(o);else if(!n)throw new Error("unexpected token '"+r+"'");e.push(r)});for(var r,t;(r=e.lastIndexOf("("))>-1&&(t=e.indexOf(")",r))>-1;)e.splice(r,t+1-r,this.process(e.slice(r+1,t)));if(~e.indexOf("(")||~e.indexOf(")"))throw new Error("mismatching brackets");this.tree=this.process(e)}}]),e}();t["default"]=p},{}]},{},["/Users/dhenton/responsive/js-parser/src/code/index.js"]);