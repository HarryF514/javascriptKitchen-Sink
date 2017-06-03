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

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/articledb", function(err, db) {
    if (err) {
        return console.dir(err); }

    var col = db.collection('Article');

    var c = new Crawler({
        maxConnections: 200,
        timeout: 5000,
        // This will be called for each crawled page
        callback: function(error, result, done) {
            log("crawler.queueSize = " + c.queueSize)
            done();
            if (error) {
                log(error);
            }
            log("callback");

            try {
                var metaData = ArticleParser.parseMeta(result.body, result.uri);
                ArticleParser.getArticle(result.body).then(function(_result) {
                    var article = _.extend(metaData, { content: _result });
                    if (article.content.length > 2000) {
                        //log(article);
                        col.find({ title: article.title }).toArray(function(err, docs) {
                            if (docs.length === 0) {
                                col.insertOne(article);
                            }

                        })
                    } else {
                        log("article length less than 2000");
                    }

                });


            } catch (err) {
                log(err);
            }


        }
    })
    setInterval(function() {

    }, 50);
    var doFindAndQueue = {
        go: function() {
            db.collection('Url').findOne({ isArticle: false }, function(err, docs) {
                if (err) {
                    log(err);
                }
                try {

                    log("going to get " + docs.url);
                    db.collection('Url').updateMany({ url: docs.url }, { $set: { isArticle: true } }, function(err, r) {
                        if (err) {
                            log(err);
                        }
                        c.queue(docs.url);
                        doFindAndQueue.go();
                    });
                } catch (err) {
                    log(err);
                }
            })
        }
    }
    doFindAndQueue.go();


    setTimeout(function() {
        exec("forever restart index.js", function(error, stdout, stderr) {
            if (error) {
                console.log(error);
                return;
            }
            if (stdout) {
                console.log(stdout);
            }
        });
    }, 10 * 60000);

});
