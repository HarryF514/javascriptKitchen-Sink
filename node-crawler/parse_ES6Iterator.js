var Crawler = require("crawler");
var url = require('url');
var cache = require('memory-cache');

var _ = require("underscore");
var extractor = require('unfluff');
var ArticleParser = require('article-parser');

var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';

function log(s) {
    //console.log(s);
}

function extraLog(s){
    //console.log(s);
}


var getAllItemsByClassName = {
    counter:0,
    resultsArray:[],
    run:function(className,callback){
        var self = this;
        var query = new Parse.Query(className);
        query.limit(1000);
        query.skip(1000*this.counter);
        query.find().then(function(results){
            if(results.length == 0){
                callback(self.resultsArray);
                return;
            }
            for(var i=0;i<results.length;i++){
                self.resultsArray.push(results[i]);
            }
            self.counter++;
            self.run(className,callback);
        })
    }
}



var leanextension = {
    getAllItemsByClassName:getAllItemsByClassName
}

//var c = ;

var queueObj = {
    urlArray: [],
    patt: /(http:\/\/)/,
    queueingUrlNumber:0,
    domainKeyWord:"http://news.xkb.com.cn/",
    staringUrl:"http://news.xkb.com.cn/",
    c: new Crawler({
        maxConnections: 10,
        forceUTF8: true,
        retries:1,
        retryTimeout:2000,
        timeout:5000,
        onDrain: function () {
            console.log("a finished,no more queue");
        },
        callback: function (error, result, $) {
            queueObj.queueingUrlNumber--;
            try{
                log("callback url is " + result.uri);
                ArticleParser.extract(result.uri).then((article) => {
                    //console.log(article.url)
                    //console.log(article);
                    saveToParseByCheckingTitle.save(article);
                }).catch((err) => {
                    console.log(err);
                });
            
            } catch(e){

            }
            if(error){
                log("callback error");
                log(error);
            }

            try {
                var validUrl = 0;
                $('a').each(function (index, a) {
                    var toQueueUrl = $(a).attr('href');
                    extraLog(toQueueUrl);
                    if (queueObj.patt.test(toQueueUrl) && toQueueUrl.indexOf(queueObj.domainKeyWord) != -1) {

                        if (cache.get(toQueueUrl)) {

                        } else {
                            validUrl++;
                            cache.put(toQueueUrl, true);
                            queueObj.urlArray.push(toQueueUrl);
                            if(queueObj.queueingUrlNumber<=100){
                                queueObj.queueingUrlNumber++;
                            }
                            queueObj.c.queue(toQueueUrl);
                        }

                    }
                });
                log("valid url " + validUrl);
                log("queueingUrlNumber url " + queueObj.queueingUrlNumber);
                log("total url " + queueObj.urlArray.length);
                
            } catch (e) {
                log(e);
            }
        }
    })
}



var saveToParseByCheckingTitle = {
    check:function(title){
        var Article = Parse.Object.extend("Article");
        var query = new Parse.Query(Article);
        query.equalTo("title", title);
        return query.find();
    },
    save:function(obj){
        var TestObject = Parse.Object.extend("Article");
        var testObject = new TestObject();
        return saveToParseByCheckingTitle.check(obj.title).then(function(results){    
            if(results.length > 0){
                
            }else{
                testObject.save(obj).then(function(savedObj){
                    console.log("saved " + obj.title)
                },function(error){
                    log(error);
                });
            }
        })
    }
}


setInterval(function(){
    go();
},1000*60)

function go(){
    leanextension.getAllItemsByClassName.run("Article",function(result){
        log("cache " + result.length);
        for(var i = 0; i<result.length;i++){
            cache.put(result[i].get("url"), true);
        }
        getSimilarDomainObj.run();
        queueObj.c.queue(queueObj.staringUrl);
    });
}

var getSimilarDomainObj = {
    run:function(){
        var query = new Parse.Query("Article");
        query.contains("url",queueObj.domainKeyWord);
        query.find().then(function(result){
            var sample = _.sample(result,10);
            for(var k=0;k<sample.length;k++){
                console.log(sample[k].get("url"));
                queueObj.c.queue(sample[k].get("url"));
            }
        })
    }
}
go();



