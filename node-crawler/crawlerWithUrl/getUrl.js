var Crawler = require("crawler");
var url = require('url');
var jsdom = require('jsdom');
var _ = require("underscore");

var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';


var c = new Crawler({
    maxConnections : 100,
    jQuery: jsdom,
    timeout: 5000,
    // This will be called for each crawled page
    callback : function (error, result, $) {
        console.log("start callback");
        console.log(new Date());
        UrlUtil.getUnQueueUrl().then(function(_result){
            console.log("returning url is " + _result.get("url"));
            _result.set("queue",true);
            _result.save().then(function(){
                var url = _result.get("url");
                console.log("going to queue  " + url);
                c.queue(url);
            })
        });
        if(error){
            console.log(error);
        }else{

            try {
                //console.log($("title").text());
                $('a').each(function (index, a) {
                    var toQueueUrl = $(a).attr('href').split('#')[0];
                    if(toQueueUrl.indexOf("http") == 0 && toQueueUrl.indexOf(domainKeyWord) != -1){
                        UrlUtil.saveUrl(toQueueUrl);
                    }
                });


            } catch (e) {
                //console.log(e);
            }
        }
    }
});

var UrlUtil = {
    countUnCheckUrl:function(){
        var Article = Parse.Object.extend(removeDuplicate.className);
        var query = new Parse.Query(Article);
        //query.notEqualTo("isChecked", removeDuplicate.identifier);
        query.doesNotExist("isChecked");
        query.count().then(function(results){
            console.log("uncheck count " + results);
        })
    },
    checkUrl: function (url) {
        var Qurl = Parse.Object.extend("Qurl");
        var query = new Parse.Query(Qurl);
        query.equalTo("url", url);
        return query.find();
    },
    saveUrl:function(url){
        UrlUtil.checkUrl(url).then(function(_results){
            if(_results.length == 0){
                var TestObject = Parse.Object.extend("Qurl");
                var testObject = new TestObject();
                return testObject.save({url:url});
            }
        }).catch(function(error){
            console.log(error);
        })
    },
    getUnQueueUrl:function(){
        var Qurl = Parse.Object.extend("Qurl");
        var query = new Parse.Query(Qurl);
        query.doesNotExist("queue");
        return query.first();
    }
}

var removeDuplicate = {
    identifier:_.sample(["a","b","c","d","e","f","g","h","i"]),
    columna:"url",
    className:"Qurl",
    getNonCheckObj:function(){
        var Article = Parse.Object.extend(removeDuplicate.className);
        var query = new Parse.Query(Article);
        //query.notEqualTo("isChecked", removeDuplicate.identifier);
        query.doesNotExist("isChecked");
        return query.first();
    },
    getObjByTitle:function(title){
        var Article = Parse.Object.extend(removeDuplicate.className);
        var query = new Parse.Query(Article);
        query.equalTo(removeDuplicate.columna, title);
        return query.find();
    },
    checkTitle:function(){
        removeDuplicate.getNonCheckObj().then(function(result){
            if(result == undefined){
                console.log("remvoe duplicated done");
                //removeDuplicate.identifier = _.sample(["a","b","c","d","e","f","g","h","i"]);
                setTimeout(function(){
                    removeDuplicate.checkTitle();
                },15000);
            }

            var title= result.get(removeDuplicate.columna);
            removeDuplicate.getObjByTitle(title).then(function(_result){
                if(_result.length > 1){
                    console.log("deleting " + _result[0].get(removeDuplicate.columna));
                    var indexToRemove = 0;
                    var numberToRemove = 1;
                    _result.splice(indexToRemove, numberToRemove);
                    return  Parse.Object.destroyAll(_result);

                }else{
                    _result[0].set("isChecked",removeDuplicate.identifier);
                    return _result[0].save();
                }
            }).then(function(__result){
                removeDuplicate.checkTitle();
            });
        })
    }
}
setInterval(function(){
    UrlUtil.countUnCheckUrl();
},1000)
//
removeDuplicate.checkTitle();
var domainKeyWord = "http://blog.csdn.net/";
c.queue(domainKeyWord);