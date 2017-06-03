/*
 * @Author: harryfeng
 * @Date:   2017-06-01 16:35:09
 * @Last Modified by:   harryfeng
 * @Last Modified time: 2017-06-01 16:47:18
 */

'use strict';

var Crawler = require("crawler");
var _ = require("underscore");
var ArticleParser = require('article-parser');
var jsdom = require('jsdom');
var url = require('url');
var exec = require('child_process').exec;

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

function log(s) {
    console.log(s);
}

var initdb = function() {

    MongoClient.connect("mongodb://localhost:27017/articledb", function(err, db) {
        if (err) {
            return console.dir(err);
        }
        var col = db.collection('Url');

        function startInsert() {
            var ran_number = Math.random();
            col.insert({ url: "http://bbs.51.ca/member.php?mod" + ran_number, title: 't' + ran_number }, function() {
                console.log("random number", ran_number);
                startInsert();
            })
        }
        startInsert();
    });
};

var updateIsArticleFalse = function() {
    MongoClient.connect("mongodb://localhost:27017/articledb", function(err, db) {
        if (err) {
            return console.dir(err);
        }
        var col = db.collection('Url');
        var o = { w: 1 };
        o.multi = true
        col.updateMany({ isArticle: { $exists: false } }, { $set: { isArticle: false } }, o, function(err, r) {
            col.updateMany({ isQueue: { $exists: false } }, { $set: { isQueue: false } }, o, function(err, r) {
                console.log("update result", r.result);
            });
        });
    });
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
                            if (docs.length === 0) {
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
//updateIsArticleFalse();
//initdb();