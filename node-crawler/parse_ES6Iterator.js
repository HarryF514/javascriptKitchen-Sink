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
    domainKeyWord:"http://world.huanqiu.com/",
    c: new Crawler({
        maxConnections: 10,
        forceUTF8: true,
        retries:1,
        retryTimeout:2000,
        timeout:5000,
        onDrain: function () {
            log("a finished,no more queue");
        },
        callback: function (error, result, $) {
            queueObj.queueingUrlNumber--;
            log(it2.next().value);
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



function idMaker(){
    var index = 0;
    
    return {
       next: function(){
           return {value: index++, done: false};
       }
    };
}

var it = idMaker();
var it2 = idMaker();

var saveToParse = {
    check:function(url){
        var Article = Parse.Object.extend("Article");
        var query = new Parse.Query(Article);
        query.equalTo("url", url);
        return query.find();
    },
    save:function(url){
        var TestObject = Parse.Object.extend("Article");
        var testObject = new TestObject();
        return saveToParse.check(url).then(function(results){    
            if(results.length > 0){
                
            }else{
                testObject.save({url:url}).then(function(savedObj){
                    
                },function(error){
                    log(error);
                });
            }
        })
    }
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
    var sample = _.sample(result,10);
        for(var k=0;k<sample.length;k++){
            queueObj.c.queue(sample[k].get("url"));
        }
    });
}
go();
queueObj.c.queue(queueObj.domainKeyWord);

var getContent = {
    runingUrl:'http://china.huanqiu.com/article/2016-11/9738273.html?from=bdwz',
    getNonContentObj:function(){
        var Article = Parse.Object.extend("Article");
        var query = new Parse.Query(Article);
        query.doesNotExist("title");
        return query.first();
    },
    checkTitle:function(title){
        var Article = Parse.Object.extend("Article");
        var query = new Parse.Query(Article);
        query.equalTo("title", title);
        return query.find();
    },
    run:function(){
        console.log(getContent.runingUrl);
        ArticleParser.extract(getContent.runingUrl).then(function (data) {
            console.log(data.title);
            getContent.checkTitle(data.title).then(function(results){
                    getContent.getNonContentObj().then(function(nonContentResult){
                        console.log(nonContentResult);
                        getContent.runingUrl = nonContentResult.get("url");
                        getContent.run();
                    });
                    var TestObject = Parse.Object.extend("Article");
                    var testObject = new TestObject();
                    testObject.save(data).then(function(){
                        console.log("save new artile");
                    },function(error){
                        console.log(error);
                    });
            })
        },function(error){
            console.log(error);
        });
    }
}

