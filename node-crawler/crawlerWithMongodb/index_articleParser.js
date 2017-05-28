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

    var go = {
        newUrlArray:[],
        getArticle:function(url, callback){
            try{
                ArticleParser.extract(url).then(function(article){
                    log("article length " + article.title);
                    log("article length " + article.content.length);
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

                    callback();
                }).catch(function(err){
                    log("ArticleParser.extract error " + err.toString());
                    callback();
                })


            }catch (err){
                log(err);
            }
        },
        getNewUrl:function(callback){
            db.collection('Url').findOneAndUpdate({isArticle:{$exists:false},titleLength:{$gt:10,$lt:40}},{$set: {isArticle: true}},function(err,docs){
                if(err){
                    log(err);
                }
                try{
                    go.newUrlArray.push(docs.value.url);
                    if(go.newUrlArray.length < 10){
                        go.getNewUrl(callback);
                    }else{
                        callback(go.newUrlArray);
                        go.newUrlArray = [];
                    }
                    
                    log("going to get " + docs.value.url);
                }catch(err){
                    log(err);
                }
            })
        },
        begin:function(){
            go.getNewUrl(function(url){
                _.each(go.newUrlArray,function(element,index,list){
                    go.getArticle(element, function(){
                                        
                    });
                });
                setTimeout(function(){
                    go.begin();
                }, 2000);
            })
        }
    }
    col.createIndex( { "title": 1 }, { unique: true } );
    go.begin();

});