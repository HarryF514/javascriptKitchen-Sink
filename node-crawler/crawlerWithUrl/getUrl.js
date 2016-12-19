var Crawler = require("crawler");
var url = require('url');
var jsdom = require('jsdom');
var _ = require("underscore");

var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';
var domainList = require("./domainList");
var nonDomainKeyWord = require("./nonDomainKeyWord");


function go(domain){
    var c = new Crawler({
        maxConnections : 100,
        jQuery: jsdom,
        timeout: 5000,
        // This will be called for each crawled page
        callback : function (error, result, $) {
            //console.log(result.body);
            //console.log("start callback");
            //console.log(new Date());
            UrlUtil.getUnQueueUrl().then(function(_result){
                //console.log("returning url is " + _result.get("url"));
                _result.set("queue",true);
                _result.save().then(function(){
                    var url = _result.get("url");
                    console.log("saved going to queue  " + url);
                    c.queue(url);
                })
            });
            if(error){
                console.log(error);
            }else{

                try {
                    //console.log($("title").text());
                    var toQueueUrlArray = [];
                    var newDomainUrlArray = [];
                    $('a').each(function (index, a) {
                        var toQueueUrl = $(a).prop('href').split('#')[0];
                        if(toQueueUrl.indexOf("http") == 0 && toQueueUrl.indexOf(domainKeyWord) != -1){
                            //console.log(toQueueUrl);
                            if(nonDomainKeyWord.hasNonDomainKeyWords(toQueueUrl)){

                            }else{
                                toQueueUrlArray.push(toQueueUrl);
                            }


                        }
                        if(toQueueUrl.indexOf("http") == 0 && toQueueUrl.indexOf(domainKeyWord) == -1){
                            //console.log("new domain " + UrlUtil.extractDomain(toQueueUrl));
                            newDomainUrlArray.push(UrlUtil.extractDomain(toQueueUrl));
                        }
                    });

                    toQueueUrlArray = _.uniq(toQueueUrlArray);
                    _.each(toQueueUrlArray,function(element,index,list){
                        UrlUtil.saveUrl(element);
                    })

                    newDomainUrlArray = _.uniq(newDomainUrlArray);
                    _.each(newDomainUrlArray,function(element,index,list){
                        if(element.length < 21){
                            //console.log("save new domian " + element);
                            UrlUtil.saveNewDomain(element);
                        }

                    })


                } catch (e) {
                    //console.log(e);
                }
            }
        }
    });

    var UrlUtil = {
        extractDomain:function(url){
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
        },
        saveNewDomain:function(url){
            var Qurl = Parse.Object.extend("newDomain");
            var query = new Parse.Query(Qurl);
            query.equalTo("url", url);
            query.find().then(function(_results){
                if(_results.length == 0){
                    console.log("start to save new domain");
                    var TestObject = Parse.Object.extend("newDomain");
                    var testObject = new TestObject();
                    return testObject.save({url:url});
                }
            }).catch(function(error){
                console.log(error);
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
            query.contains("url",domain);
            return query.first();
        }
    }


    var domainKeyWord = domain;
    c.queue(domainKeyWord);
}

setInterval(function(){
    console.log(restarme);
},120*1000);

(function(){
    var qurlCount = 0;
    setInterval(function(){
        var theQurl = Parse.Object.extend("Qurl");
        var query = new Parse.Query(theQurl);
        query.count().then(function(_count){
            //console.log("process article count is " + _count);
            console.log("current articles", _count - qurlCount);
            qurlCount = _count;

        })
    },5000);
})();


var domainArray = domainList();
//console.log(domainArray);
for(var i = 0;i<domainArray.length; i++){
    new go(domainArray[i]);
}

(function(){
    var alexa = require('alexarank');
    var updateAlexa = {
        go:function(){
            var Qurl = Parse.Object.extend("newDomain");
            var query = new Parse.Query(Qurl);
            query.doesNotExist("rank");
            query.first().then(function(_result){
                console.log(_result.get("url"));
                alexa(_result.get("url"), function(error, result) {
                    console.log(result);
                    var rank = {
                        rank:parseInt(result.rank)
                    }
                    if (!error) {
                        _result.save(rank).then(function(){
                            console.log("saved new domain");
                            updateAlexa.go();
                        },function(error){
                            console.log(error);
                        });
                    } else {
                        console.log(error);
                    }

                });
            });
        }
    }
    updateAlexa.go();
}());

