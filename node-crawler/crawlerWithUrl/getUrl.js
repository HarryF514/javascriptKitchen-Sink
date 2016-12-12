var Crawler = require("crawler");
var url = require('url');
var jsdom = require('jsdom');
var _ = require("underscore");

var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';
var domainList = require("./domainList");


function go(domain){
    var c = new Crawler({
        maxConnections : 100,
        jQuery: jsdom,
        timeout: 5000,
        // This will be called for each crawled page
        callback : function (error, result, $) {
            //console.log(result.body);
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
                        var toQueueUrl = $(a).prop('href').split('#')[0];
                        if(toQueueUrl.indexOf("http") == 0 && toQueueUrl.indexOf(domainKeyWord) != -1){
                            //console.log(toQueueUrl);
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
            query.contains("url",domain);
            return query.first();
        }
    }


    var domainKeyWord = domain;
    c.queue(domainKeyWord);
}

var domainArray = domainList();
//console.log(domainArray);
for(var i = 0;i<domainArray.length; i++){
    new go(domainArray[i]);
}