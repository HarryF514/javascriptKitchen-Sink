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

function log(s){
    console.log(s);
}

MongoClient.connect("mongodb://localhost:27017/articledb", function(err, db) {
    if(err) { return console.dir(err); }
    var col = db.collection('Url');
    
});

setTimeout(function () {
    exec("forever restart articleParserMultiple.js", function (error, stdout, stderr) {
        if (error) {
            console.log(error);
            return;
        }
        if (stdout) {
            console.log(stdout);
        }
    });
}, 10 * 60000);