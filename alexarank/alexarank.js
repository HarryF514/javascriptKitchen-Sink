var alexa = require('alexarank');

alexa("echojs.com", function(error, result) {
    if (!error) {
        console.log(JSON.stringify(result));
    } else {
        console.log(error);
    }
});