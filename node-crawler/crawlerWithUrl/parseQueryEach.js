var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';
var domainList = require("./domainList");
var _ = require("underscore");
var nonDomainKeyWord = require("./nonDomainKeyWord");

var counter = 0;
var theCount = 0;
var aQurl = Parse.Object.extend("Qurl");
var aquery = new Parse.Query(aQurl);
aquery.doesNotExist("qArticle");
aquery.count().then(function(_count){
    theCount = _count;
})
var setBlock = {
    run:function(){

        var Qurl = Parse.Object.extend("Qurl");
        var query = new Parse.Query(Qurl);
        query.doesNotExist("qArticle");
        query.each(function(_result){
            counter++;
            console.log(theCount - counter);
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

            if(nonDomainKeyWord.hasNonDomainKeyWords(nonDomianUrl)){
                return _result.destroy();
            }else{
                if(nonDomainKeyWord.hasGoodWords(nonDomianUrl)){
                    _result.set("goodWords", true);
                }
                _result.set("block", _.random(0, 90));
                _result.set("urlDigi", digiNumber);
                return _result.save();
            }

        }).catch(function(error){
            console.log(error);
        })

    }
}

setInterval(function(){
    setBlock.run();
},60*1000*60*7);


setBlock.run();