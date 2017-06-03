var Crawler = require("crawler");
var _ = require("underscore");
var ArticleParser = require('article-parser');
ArticleParser.configure({
    timeout: 15 * 1000
})

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

function pickRandom() {

}

MongoClient.connect("mongodb://localhost:27017/articledb", function(err, db) {
    if (err) {
        return console.dir(err);
    }
    var col = db.collection('Url');
    var callbackCounter = 0;
    var checkQualityCoubter = 0;
    var urlDomain = "";

    getUniqueUrlDomain();

    function getUniqueUrlDomain() {
        col.aggregate([{ $match: { qualityPercentage: -1 } }, { $group: { _id: "$urlDomain", count: { $sum: 1 } } }, { $sort: { count: -1 } }], function(err, results) {
            if (err) {
                console.log("getUniqueUrlDomain err", err);
                return;
            }
            if (results.length === 0) {
                console.log("getUniqueUrlDomain finished");
                return;
            }
            urlDomain = results[0]._id;
            if (urlDomain == null) {
                console.log("update url domain");
                return;
            }
            log(urlDomain);
            parseArticle(results[0]._id);
        });
    }

    function parseArticle(urlDomain) {
        var sampleSize = 50;
        col.aggregate(
            [{ $match: { urlDomain: urlDomain, qualityPercentage: -1 } }, { $sample: { size: sampleSize } }],
            function(err, results) {
                console.log("totle requesting url", results.length);
                if (results.length < sampleSize - 1) {
                    col.updateMany({ urlDomain: urlDomain }, { $set: { qualityPercentage: 0 } }, function(err, r) {
                        console.log("update resutl", r.result);
                    });
                    getUniqueUrlDomain();
                    return;
                }

                function startGetArticle() {
                    console.log("result url", results[0].url);
                    ArticleParser.extract(results[0].url).then(function(article) {
                        log("article length " + article.content.length);
                        if (article.content.length > 2000) {
                            //log("article length " + article.title);
                            checkQualityCoubter++;
                            //log("checkQualityCoubter",checkQualityCoubter);
                        } else {
                            //log("article length less than 2000");
                        }
                    }).catch(function(err) {
                        log("ArticleParser.extract error " + err.toString());
                        //callback();
                    }).finally(function() {
                        callbackCounter++;
                        console.log("callbackCounter", callbackCounter);
                        console.log("checkQualityCoubter", checkQualityCoubter);
                        results.shift();
                        if (results.length == 0) {
                            console.log("shift finished");
                            var o = { w: 1 };
                            var qualityPercentage = checkQualityCoubter / callbackCounter;
                            if (checkQualityCoubter / callbackCounter > 0.5) {
                                // good
                                col.updateMany({ urlDomain: urlDomain }, { $set: { qualityPercentage: qualityPercentage } }, o, function(err, r) {
                                    console.log("update", r.result);
                                    getUniqueUrlDomain();
                                });
                            } else {
                                // bad
                                col.updateMany({ urlDomain: urlDomain }, { $set: { qualityPercentage: qualityPercentage } }, o, function(err, r) {
                                    console.log("update", r.result);
                                    getUniqueUrlDomain();
                                });

                            }
                            checkQualityCoubter = 0;
                            callbackCounter = 0;
                        } else {
                            startGetArticle();
                        }
                    });
                };
                startGetArticle();
            });
    };

});
