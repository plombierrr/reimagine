//reimagine    
//plombier
//2023

$(document).ready(function() {

    const languages = [
        "zh-TW", "hu", "ru", "ja", "ko","zh-TW", "fil", "ja", "jv", "zh-TW",
        "it", "ja", "ar", "hu", "kk", "zh-TW", "el", "ja", "pt", "zh-TW", "ne", "ja", "en"
    ];


    function getData(url){
        return $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            error: function(error) {
                console.log(error);
            }
        });
    };


    function dotDreaming(static, k) {

        let animated = "..."

        if (k < 0) {
            $('#inputField').val(static);
            k++;
            setTimeout(dotDreaming, 700, static, k);
        } else if (k < animated.length) {
            static += animated.charAt(k);
            $('#inputField').val(static);
            k++;
            setTimeout(dotDreaming, 700, static, k);
        };
    };


    $('#submitBtn').click(async function(){

        let input = $('#inputField').val();
        $('#submitBtn').prop('disabled', true);
        let i = 0

        if (input){

            dotDreaming("dreaming", -1);

            while (i < languages.length) {

                let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=" + languages[i] + "&dt=t&q=" + encodeURIComponent(input);
                let j = 0
                let stringArray = await getData(url);
                let translated = "";


                while (j < stringArray[0].length) {

                    translated = translated + stringArray[0][j][0];
                    console.log(stringArray[0][j][0]);
                    j++;
                }

                input = translated;
                i++;

            };

            $('#inputField').val(input);
            $('#submitBtn').prop('disabled', false);

        } else {

            $('#inputField').val("you're seeing this message because you didn't enter any text. hi!\nreimagine uses a janky google API workaround and maybe unstable.\nif you're getting results in languages other than english, try submitting fewer characters.\nsay what's up on instagram.\nbest,\n@__plombier");
            $('#submitBtn').prop('disabled', false);
        }

    });

});