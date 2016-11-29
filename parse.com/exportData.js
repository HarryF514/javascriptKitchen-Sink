var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';

var query = new Parse.Query("Article");
query.each().then(function(result){
    console.log(result);
})
