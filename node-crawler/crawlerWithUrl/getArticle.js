var Crawler = require("crawler");
var url = require('url');
var jsdom = require('jsdom');

var _ = require("underscore");
var ArticleParser = require('article-parser');

var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';
var domainList = require("./domainList");
function go(domain){
    var c = new Crawler({
        maxConnections : 100,
        //jQuery: jsdom,
        timeout: 5000,
        // This will be called for each crawled page
        callback : function (error, result, $) {
            ArticleUrlUtil.getUrl();
            try {
                console.log("callback url is " + result.uri);
                ArticleParser.extract(result.uri).then((article) => {
                    //console.log("saved artile with url " + article.title);

                    if(article.content.length > 2000){
                        saveToParseByCheckingTitle.save(article).then(function (_article) {
                            console.log(new Date());
                            console.log("saved artile with url " + _article.get("url"));
                            console.log("saved artile with title " + _article.get("title"));
                        });
                    }
                }).catch((err) => {
                    //console.log(err);
                });
        }
            catch (e){
        console.log(e);
                }

            if(error){
                //console.log(error);
            }else{

                try {

                } catch (e) {
                    //console.log(e);
                }
            }
        }
    });

    var saveToParseByCheckingTitle = {
        checkUrl: function (url) {
            var Article = Parse.Object.extend("Article");
            var query = new Parse.Query(Article);
            query.equalTo("url", url);
            return query.find();
        },
        check: function (title) {
            var Article = Parse.Object.extend("Article");
            var query = new Parse.Query(Article);
            query.equalTo("title", title);
            return query.find();
        },
        save: function (obj) {
            var TestObject = Parse.Object.extend("Article");
            var testObject = new TestObject();
            return saveToParseByCheckingTitle.check(obj.title).then(function (results) {

                if (results.length > 0) {

                } else {
                    return testObject.save(obj);
                }
            })
        }
    };

    var ArticleUrlUtil = {
        domainKeyWord:"http://blog.csdn.net/",
        getUrl:function(){
            var Qurl = Parse.Object.extend("Qurl");
            var query = new Parse.Query(Qurl);
            query.exists("isChecked");
            query.contains("url",ArticleUrlUtil.domainKeyWord);
            query.doesNotExist("qArticle");
            query.first().then(function(_result){
                var url = _result.get("url");
                _result.set("qArticle",true);
                _result.save().then(function(__result){
                    c.queue(url);
                })

            });
        }
    }
    ArticleUrlUtil.domainKeyWord = domain;
    ArticleUrlUtil.getUrl();
    //return ArticleUrlUtil;
}

setInterval(function(){
    console.log(restarme);
},120*1000);

var domainArray = domainList();
console.log(domainArray);
for(var i = 0;i<domainArray.length; i++){
    new go(domainArray[i]);
}