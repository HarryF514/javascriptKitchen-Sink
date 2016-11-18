var request = require('request');
console.log("go");
request('https://www.google.com/', function (error, response, body) {
    console.log(error);
    console.log(body);
    if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the Google homepage.
    }
})