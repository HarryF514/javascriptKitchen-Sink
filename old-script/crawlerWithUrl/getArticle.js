var Crawler = require("crawler");
var url = require('url');
var jsdom = require('jsdom');

var _ = require("underscore");
var ArticleParser = require('article-parser');

var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';
var domainList = require("./domainList");
var go = function(options){

    var c = new Crawler({
        maxConnections : 100,
        timeout: 15000,
        // This will be called for each crawled page
        callback : function (error, result, $) {


            try{
                var metaData = ArticleParser.parseMeta(result.body, result.uri);
                ArticleParser.getArticle(result.body).then(function(_result){
                    ArticleUrlUtil.getUrl();
                    //console.log(_result);
                    var article = _.extend(metaData, {content: _result});
                    if(article.content.length > 2000){
                        saveToParseByCheckingTitle.save(article).then(function (_article) {
                            //console.log(new Date());
                            //console.log("saved artile with url " + _article.get("url"));
                            //console.log("saved artile with title " + _article.get("title"));

                        });
                    }
                });
                //console.log(metaData);


            }catch(e){

            }
        }
    })

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
            //query.exists("goodWords");
            query.descending("urlDigi");
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
                    console.log("finish block " + JSON.stringify(options));
                    return;
                }
                //console.log("result queue obj " + _result);
                var url = _result.get("url");

                _result.set("qArticle",true);
                _result.save().then(function(__result){
                    //console.log("url is " + url);
                    c.queue(url);
                    //extractit.run(url);
                })

            });
        }
    }


    ArticleUrlUtil.getUrl();
    //return ArticleUrlUtil;
}


setInterval(function(){
    console.log(restarme);
},120*1000);

var domainArray = domainList();
//console.log(domainArray);
for(var i = 0;i<domainArray.length; i++){
//    new go({domain:domainArray[i],block:1});
//    new go({domain:domainArray[i],block:2});
//    new go({domain:domainArray[i],block:3});
//    new go({domain:domainArray[i],block:4});
//    new go({domain:domainArray[i],block:5});
//    new go({domain:domainArray[i],block:6});
//    new go({domain:domainArray[i],block:7});
//    new go({domain:domainArray[i],block:8});
//    new go({domain:domainArray[i],block:9});




}

module.exports = go;
//
//new go({block:2});
//new go({block:3});
//new go({block:4});
//new go({block:5});
//new go({block:6});
//new go({block:7});
//new go({block:8});
//new go({block:9});

//new go();