var Crawler = require("crawler");
var _ = require("underscore");
var ArticleParser = require('article-parser');
var jsdom = require('jsdom');
var url = require('url');

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

MongoClient.connect("mongodb://localhost:27017/articledb", function(err, db) {
    if(err) { return console.dir(err); }
    var col = db.collection('Url');
    var c = new Crawler({
        maxConnections : 100,
        timeout: 15000,
        jQuery: jsdom,
        // This will be called for each crawled page
        callback : function (error, result, done) {
            done();
            try{
                log(result.options.uri);

                var $ = result.$;
                $('a').each(function (index, a) {
                    var toQueueUrl = $(a).prop('href').split('#')[0];
                    var text = $(a).text().trim();
                    if (escape(text).indexOf("%u") < 0) {
                        //alert("没有包含中文");
                        //console.log('no chinese', text);
                    }
                    else {
                        //alert("包含中文");
                        if (toQueueUrl.indexOf("http://") == 0) {
                            col.find({url: toQueueUrl}).toArray(function (err, docs) {
                                if (docs.length === 0) {
                                    col.insertOne({url: toQueueUrl});
                                }
                            })
                        }
                    }
                })
            }catch (e){

            }
        }
    })

    setInterval(function(){
        col.findOne({isQueue:{$exists:false}},function(err,docs){
            log("going to queue" + docs.url);
            if (docs && docs.url) {
                c.queue(docs.url);
                col.updateMany({url: docs.url}, {$set: {isQueue: true}});
            }
        })
    },1000);
    c.queue("http://blog.csdn.net/");
    col.createIndex( { "url": 1 }, { unique: true } )
})