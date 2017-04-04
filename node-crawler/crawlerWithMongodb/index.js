var Crawler = require("crawler");
var _ = require("underscore");
var ArticleParser = require('article-parser');


var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    assert = require('assert');

function log(s){
    console.log(s);
}


// Connect to the db
MongoClient.connect("mongodb://localhost:27017/articledb", function(err, db) {
    if(err) { return console.dir(err); }

    var col = db.collection('Article');

    var c = new Crawler({
        maxConnections : 200,
        timeout: 5000,
        // This will be called for each crawled page
        callback : function (error, result, done) {
            log("crawler.queueSize = " + c.queueSize)
            done();
            if(error){
                log(error);
            }
            log("callback");

            try{
                var metaData = ArticleParser.parseMeta(result.body, result.uri);
                ArticleParser.getArticle(result.body).then(function(_result){
                    var article = _.extend(metaData, {content: _result});
                    if(article.content.length > 2000){
                        //log(article);
                        col.find({title:article.title}).toArray(function(err,docs){
                            if(docs.length === 0){
                                col.insertOne(article);
                            }

                        })
                    }else{
                        log("article length less than 2000");
                    }

                });


            }catch (err){
                log(err);
            }


        }
    })
    setInterval(function(){
        db.collection('Url').findOne({isArticle:{$exists:false}},function(err,docs){
            if(err){
                log(err);
            }
            try{
                c.queue(docs.url);
                log("going to get " + docs.url);
                db.collection('Url').updateMany({url:docs.url}, {$set: {isArticle: true}});
            }catch(err){
                log(err);
            }

        })
    },50);


});