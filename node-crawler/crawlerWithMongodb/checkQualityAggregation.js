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
        col.aggregate([{ $match: { isGood: { $exists: false } } }, { $group: { _id: "$urlDomain" } }], function(err, results) {
            urlDomain = results[0]._id;
            log(urlDomain);
            parseArticle(results[0]._id);
        });
    }

    function parseArticle(urlDomain) {
        col.aggregate(
            [{ $match: { urlDomain: urlDomain, isGood: { $exists: false } } }, { $sample: { size: 150 } }],
            function(err, results) {
                console.log("totle requesting url", results.length);
                if (results.length < 149) {
                    col.updateMany({ urlDomain: urlDomain }, { $set: { isGood: false } }, function(err, r) {
                        console.log("update resutl", r.result);
                    });
                    getUniqueUrlDomain();
                    return;
                }
                _.each(results, function(element, index, list) {
                    ArticleParser.extract(element.url).then(function(article) {
                        callbackCounter++;
                        if (article.content.length > 2000) {
                            //log("article length " + article.title);
                            log("article length " + article.content.length);
                            checkQualityCoubter++;
                            //log("checkQualityCoubter",checkQualityCoubter);
                        } else {
                            //log("article length less than 2000");
                        }
                    }).catch(function(err) {
                        log("ArticleParser.extract error " + err.toString());
                        //callback();
                    });
                })
            });
    };

    // setInterval(function() {
    //     console.log("checkQualityCounter", checkQualityCoubter);
    //     console.log("callbackCounter", callbackCounter);
    //     checkQualityCoubter = 0;
    //     callbackCounter = 0;
    //     if (checkQualityCoubter < 20) {
    //         col.updateMany({ urlDomain: urlDomain }, { $set: { isGood: false } }, function(err, r) {
    //             console.log("update resutl", r.result);
    //         });
    //     } else {
    //         col.updateMany({ urlDomain: urlDomain }, { $set: { isGood: true } }, function(err, r) {
    //             console.log("update resutl", r.result);
    //         });
    //     };
    //     getUniqueUrlDomain();
    // }, 20000);
    setInterval(function(){
        console.log("callbackCounter", callbackCounter);
        if(callbackCounter < 149){
                if (checkQualityCoubter < 20) {
        col.updateMany({ urlDomain: urlDomain }, { $set: { isGood: false } }, function(err, r) {
            console.log("update resutl", r.result);
                });
            } else {
                col.updateMany({ urlDomain: urlDomain }, { $set: { isGood: true } }, function(err, r) {
                    console.log("update resutl", r.result);
                });
            };
        }
    }, 500);

});
