var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';
var domainList = require("./domainList");
var _ = require("underscore");

var extractDomain = function(url){
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    domain = domain.split(':')[0];

    if(domain.split('.').length == 4){
        domain = domain.split('.')[1] + "." + domain.split('.')[2] + "." +domain.split('.')[3];
    }

    return domain;
}

var setBlock = {
    run:function(){
        var Qurl = Parse.Object.extend("Qurl");
        var query = new Parse.Query(Qurl);
        //query.doesNotExist("block");
        query.each(function(_result){
            var domain;
            var url = _result.get("url");
            if (url.indexOf("://") > -1) {
                domain = url.split('/')[2];
            }
            else {
                domain = url.split('/');
            }
            var nonDomianUrl = url.replace(domain,"");
            var digiNumber = 0;
            if(nonDomianUrl.match(/\d/g)){
                digiNumber = nonDomianUrl.match(/\d/g).length;
            }
            _result.set("block", _.random(0, 90));
            _result.set("urlDigi", digiNumber);
            return _result.save();
        }).catch(function(error){
            console.log(error);
        })

    }
}

setBlock.run();