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

function sharedStart(array){
    var A= array.concat().sort(),
        a1= A[0], a2= A[A.length-1], L= a1.length, i= 0;
    while(i<L && a1.charAt(i)=== a2.charAt(i)) i++;
    return a1.substring(0, i);
}

function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

MongoClient.connect("mongodb://localhost:27017/articledb", function(err, db) {
    if(err) { return console.dir(err); }
    var col = db.collection('Url');

    var go = {
        findUrl:function(){
            col.find({isGood:{$exists:false}}).sort({url:-1}).limit(200).toArray(function(err, docs) {
                if(docs.length === 0){
                    log("finish");
                    return;
                }
                try{
                    var urlArray = _.pluck(docs, "url");
                    //log(urlArray);
                    urlArray = _.sortBy(urlArray, function(num){ return -num.length; });
                    var subStringArray = [];
                    var subStringObj = {};

                    for(var k=0;k<urlArray.length;k++){
                        var stringLen = urlArray[k].length;
                        //log(stringLen);
                        for(var i=0;i<stringLen-1;i++){
                            var subString = urlArray[k].substring(0, stringLen - i);
                            var counter = 0;
                            for(var j=0;j<urlArray.length;j++){
                                if(urlArray[j].indexOf(subString) === 0){
                                    //log("fount subString is " + subString)
                                    counter++;
                                }
                            }

                            if(counter > 5){
                                subStringArray.push(subString);
                                subStringObj[subString] = urlArray[k];
                                break;
                                //log(subString + " count " + counter);
                            }
//                        break;
                            //log(subString)
                        }
                    }
                    var uniqueSubStringArray = _.uniq(subStringArray);
                    var sortUniqueSubStringArray = _.sortBy(uniqueSubStringArray, function(num){ return -num.length; });

                    var finalString = sortUniqueSubStringArray[0];
                }catch(err){

                }
                try{
                    col.find({"url":{ $regex: escapeRegExp(finalString)+".*" }}).toArray(function(err,docs){
                        var fullUrl = docs[0].url;
                        log("fetching url " + fullUrl);
                        ArticleParser.extract(fullUrl).then(function(article){
                            go.findUrl();
                            if(article.content.length > 2000){
                                log("found good article");
                                col.find({"url":{ $regex: escapeRegExp(finalString)+".*" }}).toArray(function(err,docs){
                                    if(docs.length === 0){
                                        col.insertOne(article);
                                    }
                                })

                                col.updateMany({"url":{ $regex: escapeRegExp(finalString)+".*" }}, {$set:{isGood:true}},function(err, r){
                                    if(err){
                                        log(err);
                                    }
                                    log(r.result);
                                });

                            }else{
                                //log("article length less than 10");
                                col.updateMany({"url":{ $regex: escapeRegExp(finalString)+".*" }}, {$set:{isGood:false}},function(err, r){
                                    if(err){
                                        log(err);
                                    }
                                    //log(r.result);
                                });
                            }

                        }).catch(function(err){
                            go.findUrl();
                            col.updateMany({"url":{ $regex: escapeRegExp(finalString)+".*" }}, {$set:{isGood:false}},function(err, r){
                                if(err){
                                    log(err);
                                }
                                //log(r.result);
                            });
                            log("ArticleParser.extract error " + err.toString());
                        })

                    })
                }catch(err){
                    log(err);
                }

            });
        }
    }

    go.findUrl();
    col.createIndex( { "url": 1 }, { unique: true } )
})