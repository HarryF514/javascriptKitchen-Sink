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
        return console.dir(err); }
    var col = db.collection('Url');
    col.aggregate(
        [{ $sample: { size: 3 } } , { $match : { urlDomain : {$exists:true} } }]
    ).forEach( function(element, index) {
        log(element);
    });

});
