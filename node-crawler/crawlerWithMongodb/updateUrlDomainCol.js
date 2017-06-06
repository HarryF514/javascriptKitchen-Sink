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

MongoClient.connect("mongodb://localhost:27017/articledb", {
    keepAlive: 3000000,
    connectTimeoutMS: 3000000,
    socketTimeoutMS: 3600000
}, function(err, db) {
    if (err) {
        return console.dir(err);
    }
    var col = db.collection('Url');
    var urlDomainCol = db.collection('UrlDomain');
    //urlDomainCol.createIndex({ "urlDomain": 1 }, { unique: true });
    var callbackCounter = 0;
    var checkQualityCoubter = 0;
    var urlDomain = "";
    db.dropCollection("UrlDomain", function(err, result) {
        getUniqueUrlDomain();
    })
    

    function getUniqueUrlDomain() {
        col.aggregate([{ $group: { _id: "$urlDomain", count: { $sum: 1 } } }, { $sort: { count: -1 } }], function(err, results) {
            if (err) {
                console.log("getUniqueUrlDomain err", err);
                return;
            }
            if (results.length === 0) {
                console.log("getUniqueUrlDomain finished");
                return;
            }
            console.log("results", results);
            urlDomainCol.insertMany(results, function(err, r) {
                if(err){
                    return console.log("err",err);
                }
                console.log("urlDomainCol", r.result);
            })
        });
    }

});
