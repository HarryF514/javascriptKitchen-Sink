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

function log(s){
    console.log(s);
}

function getDomain(url){
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

MongoClient.connect("mongodb://localhost:27017/articledb", function(err, db) {
    if(err) { return console.dir(err); }
    var col = db.collection('Url');
    var updateStart = {
        find:function(){
            col.find({urlDomain:{$exists:false}}).limit(100).toArray(function(err, docs) {
                log(docs);
                _.each(docs,function(element,index,list){
                    col.updateOne({url:element.url}, {$set:{urlDomain:getDomain(element.url)}});
                });
                //col.updateOne({url:docs.url}, {$set:{urlDomain:getDomain(docs.url)}});
                setTimeout(function(){
                     updateStart.find();
                 },100);
            });
        }
    };
    updateStart.find();    

})