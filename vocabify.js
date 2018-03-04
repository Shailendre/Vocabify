$(document).ready(function () {

    var dict = 'http://api.urbandictionary.com/v0/define?term=';

    /**
     *
     * @returns {string} selected text on web page
     */
    function getSelectedText() {

        var text = '';
        if(window.getSelection()){
            text = window.getSelection().toString();
        }

        return text;
    }

    /**
     *
     * @param selectedText selected phrase on the wen page
     * @returns {string} lowercase-d parsed word, ready for definition
     */
    function getSelectedWord(selectedText) {

        var word = '';
        if (selectedText !== 'undefined' && selectedText !== '' && selectedText !== null){

            word = selectedText.trim().toLowerCase();

            if (word.match(/^[a-z]+$/)){
                return word;
            }
        }

        return 'undefined';

    }

    $(document).click(function () {
        var selectedText    =   getSelectedText();
        var word            =   getSelectedWord(selectedText);
        var response        =   '';

        if (word !== 'undefined'){
            $.ajax({
                url: dict + word,
                success: function (data) {
                    if (data.result_type === 'exact'){
                        response += word.bold() + '\n\n';
                        response += data.list[0].definition;

                        alert(response);
                        return;
                    }

                    alert("404! No meaning found for " + word.bold() + "  :(");
                },
                error: function (err) {
                    alert("Couldn't connect to online dictionary. :(" + err.status);
                },
                type: 'GET'
            });
        }
    });

});