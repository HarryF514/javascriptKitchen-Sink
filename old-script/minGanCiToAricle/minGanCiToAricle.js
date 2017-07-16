var request = require('request');
var _ = require("underscore");
var AV = require('leanengine');
AV.initialize("qIHr8eVejy878hTk3jBLzpC4-gzGzoHsz", "xEHOYUKDehIJ8h2HbHs1pTCg", "KJX9Mo2jgUiwXrRbLEVP3WyR");
//Lets try to make a HTTP GET request to modulus.io's website.
function go(){
    request('https://raw.githubusercontent.com/observerss/textfilter/master/keywords', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(typeof body); // Show the HTML for the Modulus homepage.
            var array = body.split("\n");
            console.log(_.sample(array,20));
            console.log(_.sample(array,20).join());
            var content = _.sample(array,80).join();
            var obj = {
                chineseContent:content,
                chineseTitle:content.substring(0,20),
                domain:"9i9icenter.com",
                content:"none",
                title:"none"
            }
            saveToLean(obj).then(function(){
                console.log("success");
            })
        }
    });
}


function saveToLean(obj){
    var Todo = AV.Object.extend('techcrunchNews');
    var todo = new Todo();
    return todo.save(obj);
}

go().