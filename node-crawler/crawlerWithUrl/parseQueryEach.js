var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';
var domainList = require("./domainList");
var _ = require("underscore");


var setBlock = {
    run:function(){
        var Qurl = Parse.Object.extend("Qurl");
        var query = new Parse.Query(Qurl);
        query.doesNotExist("block");
        query.each(function(_result){
            _result.set("block", _.sample([1,2,3,4,5,6,7,8,9]));
            return _result.save();
        }).catch(function(error){
            console.log(error);
        })

    }
}

setBlock.run();