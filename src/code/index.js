import TreeParser from './parser/treeParser'

        function doParse()
        {

            let input = $('#inputValue').val();
            input = input.toUpperCase();
            let parser = new TreeParser(input);
            try
            {
                parser.parse();
                $("#logicString").html(parser.toString());
                let treeText = JSON.stringify(parser.getTree(), null, 2);
                $('#treeResults').val(treeText);
            } catch (e)
            {
                $("#logicString").html("<b>Error:</b> "+e.message);
            }



        }

$('#parseButton').bind('click', doParse);