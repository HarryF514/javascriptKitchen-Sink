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

var exec = require('child_process').exec;

function log(s) {
    console.log(s);
}

var queueGetArticle = function() {
    MongoClient.connect("mongodb://localhost:27017/articledb", function(err, db) {
        if (err) {
            return console.dir(err);
        }
        var col = db.collection('Url');
        var Articlecol = db.collection('Article');
        var callbackCounter = 0;
        col.find({ isArticle: false }).sort({ qualityPercentage: -1 }).limit(100).toArray(function(e, results) {
            console.log("queueGetArticle find", results);

            function startGetArticle() {
                console.log("ArticleParser url", results[0].url);
                ArticleParser.extract(results[0].url).then(function(article) {
                    log("article length " + article.content.length);
                    if (article.content.length > 2000) {
                        //log("article length " + article.title);
                        Articlecol.find({ title: article.title }).toArray(function(err, docs) {
                            if (err) {
                                return console.log("article err", err);
                            }
                            console.log("docs.length", docs.length);
                            if (docs.length === 0) {
                                console.log("Articlecol.insertOne", article.title);
                                Articlecol.insertOne(article);
                            }

                        })
                    } else {
                        //log("article length less than 2000");
                    }
                }).catch(function(err) {
                    log("ArticleParser.extract error " + err.toString());
                    //callback();
                }).finally(function() {
                    col.updateMany({ url: results[0].url }, { $set: { isArticle: true } }, { w: 1 }, function(err, r) {
                        console.log("update", r.result);
                    });
                    callbackCounter++;
                    console.log("callbackCounter", callbackCounter);
                    results.shift();
                    if (results.length == 0) {
                        console.log("shift finished");
                        callbackCounter = 0;
                        queueGetArticle()
                    } else {
                        startGetArticle();
                    }
                });
            };
            startGetArticle();
        });
    });
}

queueGetArticle();

setTimeout(function() {
    exec("forever restart articleParserMultiple.js", function(error, stdout, stderr) {
        if (error) {
            console.log(error);
            return;
        }
        if (stdout) {
            console.log(stdout);
        }
    });
}, 10 * 60000);
