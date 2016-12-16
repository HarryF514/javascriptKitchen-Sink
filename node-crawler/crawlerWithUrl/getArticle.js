var Crawler = require("crawler");
var url = require('url');
var jsdom = require('jsdom');

var _ = require("underscore");
var ArticleParser = require('article-parser');

var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';
var domainList = require("./domainList");
function go(options){

    var extractit = {
        run:function(url){
            ArticleParser.extract(url).then(function(article){
                if(article.content.length > 2000){
                    saveToParseByCheckingTitle.save(article).then(function (_article) {
                        //console.log(new Date());
                        //console.log("saved artile with url " + _article.get("url"));
                        console.log("saved artile with title " + _article.get("title"));

                    });
                }
                ArticleUrlUtil.getUrl();
            }).catch(function(error){
                //console.log(error);
            })
        }
    }



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
        getUrl:function(){
            var Qurl = Parse.Object.extend("Qurl");
            var query = new Parse.Query(Qurl);
            //query.exists("isChecked");
            if(options){
                if(options.domain){
                    //console.log("options.domain" + options.domain);
                    query.contains("url",options.domain);
                }
                if(options.block){
                    //console.log("options.domain" + options.domain);
                    query.equalTo("block", options.block);
                }
            }
            query.doesNotExist("qArticle");
            query.first().then(function(_result){
                if(_result == undefined){
                    console.log("finish block " + options.block);
                    return;
                }
                //console.log("result queue obj " + _result);
                var url = _result.get("url");

                _result.set("qArticle",true);
                _result.save().then(function(__result){
                    //console.log("url is " + url);
                    //c.queue(url);
                    extractit.run(url);
                })

            });
        }
    }


    ArticleUrlUtil.getUrl();
    //return ArticleUrlUtil;
}
setInterval(function(){
    var Article = Parse.Object.extend("Article");
    var query = new Parse.Query(Article);
    query.count().then(function(_count){
        console.log("article count is " + _count);
    })
},2000);

setInterval(function(){
    console.log(restarme);
},120*1000);

var domainArray = domainList();
//console.log(domainArray);
for(var i = 0;i<domainArray.length; i++){
    new go({domain:domainArray[i],block:1});
    new go({domain:domainArray[i],block:2});
    new go({domain:domainArray[i],block:3});
    new go({domain:domainArray[i],block:4});
    new go({domain:domainArray[i],block:5});
    new go({domain:domainArray[i],block:6});
    new go({domain:domainArray[i],block:7});
    new go({domain:domainArray[i],block:8});
    new go({domain:domainArray[i],block:9});
}