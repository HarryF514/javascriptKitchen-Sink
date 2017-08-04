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
ArticleParser.configure({
    timeout: 15 * 1000
})
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
            col.insert({
                url: "http://bbs.51.ca/member.php?mod" + ran_number,
                title: 't' + ran_number
            }, function() {
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
        var o = {
            w: 1
        };
        o.multi = true
        col.updateMany({
            isArticle: {
                $exists: false
            }
        }, {
            $set: {
                isArticle: false
            }
        }, o, function(err, r) {
            col.updateMany({
                isQueue: {
                    $exists: false
                }
            }, {
                $set: {
                    isQueue: false
                }
            }, o, function(err, r) {
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
        var Articlecol = db.collection('ArticleParser');
        var callbackCounter = 0;
        col.find({
            isArticle: false
        }).sort({
            qualityPercentage: -1
        }).limit(100).toArray(function(e, results) {
            console.log("queueGetArticle find", results);

            function startGetArticle() {
                console.log("ArticleParser url", results[0].url);
                ArticleParser.extract(results[0].url).then(function(article) {
                    log("article length " + article.content.length);
                    if (article.content.length > 2000) {
                        //log("article length " + article.title);
                        Articlecol.find({
                            title: article.title
                        }).toArray(function(err, docs) {
                            if (err) {
                                return console.log("article err", err);
                            }
                            console.log("docs.length", docs.length);
                            if (docs.length === 0) {
                                console.log("Articlecol.insertOne", article.title);
                                article.id =
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
                    col.updateMany({
                        url: results[0].url
                    }, {
                        $set: {
                            isArticle: true
                        }
                    }, {
                        w: 1
                    }, function(err, r) {
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

var updateArtcelIdField = function() {
    var objectId = new ObjectID().toString();
    console.log(objectId);
    MongoClient.connect("mongodb://localhost:27017/articledb", function(err, db) {
        if (err) {
            return console.dir(err);
        }
        var Articlecol = db.collection('ArticleParser');
        Articlecol.findOneAndUpdate({
            id: {
                $exists: false
            }
        }, {
            $set: {
                id: objectId
            }
        }, function(err, doc) {
            if (err) {
                return console.dir(err);
            };
            console.log(doc);
            db.close();
            updateArtcelIdField();
        })
    });
}

var updateUrlIdField = function() {
    MongoClient.connect("mongodb://localhost:27017/articledb", function(err, db) {
        if (err) {
            return console.dir(err);
        }
        var Articlecol = db.collection('Url');
        startUpdate();

        function startUpdate() {
            Articlecol.find({
                id: {
                    $exists: false
                }
            }, {
                content: 0
            }).limit(1000).toArray(function(err, docs) {
                var updateThoseArticle = function() {
                    Articlecol.findOneAndUpdate({
                        _id: docs[0]._id
                    }, {
                        $set: {
                            id: new ObjectID().toString()
                        }
                    }, function(err, r) {
                        if (err) {
                            console.log(err);
                        }
                        console.log('updated', r);
                        docs.shift();
                        if (docs.length > 0) {
                            updateThoseArticle();
                        } else {
                            startUpdate();
                        }
                    });
                };
                updateThoseArticle();
            });
        }
    });
}

var removeEnglishTitleArticle = function(counter) {
    MongoClient.connect("mongodb://localhost:27017/articledb", function(err, db) {
        if (err) {
            return console.dir(err);
        }
        var Articlecol = db.collection('ArticleParser');
        Articlecol.find().limit(1000).skip(1000 * counter).toArray(function(err, docs) {
            //console.log(docs.length);
            if (docs.length === 0) {
                console.log('done');
                return;
            }
            _.each(docs, function(element, index, list) {
                if (element.domain === 'theweathernetwork.com') {
                    console.log(element.title);
                    console.log(element.domain);
                    console.log(escape(element.title).indexOf("%u"));
                };
                if (!/.*[\u4e00-\u9fa5]+.*$/.test(element.title)) {
                    // 全是英文
                    console.log('title', element.title);
                    Articlecol.removeOne({
                        _id: element._id
                    }, {
                        w: 1
                    }, function(err, r) {
                        console.log(r.result);
                        db.close();
                    });
                }
                if (index >= docs.length - 1) {
                    db.close();
                    console.log('counter', counter);
                    counter++
                    setTimeout(function() {
                        removeEnglishTitleArticle(counter);
                    }, 2000);
                }
            });
        });
    });
}

var updateCreatedDate = function(latestDate) {
    if (!latestDate) {
        var latestDate;
    }
    MongoClient.connect("mongodb://localhost:27017/articledb", function(err, db) {
        if (err) {
            return console.dir(err);
        }
        var Articlecol = db.collection('ArticleParser');

        Articlecol.findOne({}, {
            sort: {
                createdAt: -1
            }
        }).then(function(r) {
            latestDate = r.createdAt;
            if (!latestDate) {
                latestDate = new Date();
            }
            console.log('latestDate', latestDate);
            startUpdate();
        });
        return;

        function startUpdate() {
            Articlecol.find({
                createdAt: {
                    $exists: false
                }
            }, {
                content: 0
            }).limit(100).toArray(function(err, docs) {
                var updateThoseArticle = function() {
                    console.log('latestDate', latestDate);
                    Articlecol.findOneAndUpdate({
                        _id: docs[0]._id
                    }, {
                        $set: {
                            createdAt: latestDate
                        }
                    }, function(err, r) {
                        if (err) {
                            console.log(err);
                        }
                        //console.log('updated', docs[0]._id);
                        docs.shift();
                        if (docs.length > 0) {
                            updateThoseArticle();
                        } else {
                            var numberOfDaysToAdd = 1;
                            latestDate.setDate(latestDate.getDate() + numberOfDaysToAdd);
                            //db.close();
                            startUpdate();
                        }
                    });
                };
                updateThoseArticle();
            });
        }
    });
}

var updateCreatedDate_v2 = function(latestDate) {
    MongoClient.connect("mongodb://localhost:27017/articledb", function(err, db) {
        if (err) {
            return console.dir(err);
        }
        var Articlecol = db.collection('ArticleParser');


        var cursor = Articlecol.find();

        var twentyMinutesLater = new Date();


        startCursor();

        function startCursor() {
            cursor.next(function(err, r) {
                if (r.createdAt) {
                    console.log('createdAt', r.createdAt);
                    startCursor();
                    return;
                }
                Articlecol.findOneAndUpdate({
                    _id: r._id
                }, {
                    $set: {
                        createdAt: twentyMinutesLater
                    }
                }, function(err, r) {
                    if (err) {
                        console.log(err);
                    }
                    twentyMinutesLater.setMinutes(twentyMinutesLater.getMinutes() + 10);
                    console.log('updated twentyMinutesLater', twentyMinutesLater);
                    startCursor();
                });
            });
        }

    });
}

var synLocalArticleToRemove = function() {

    MongoClient.connect('mongodb://139.59.252.180:27017/articledb', function(err, remotedb) {
        if (err) {
            console.log('MongoClient.connect error', err);
            return
        };

        var remoteArticlecol = remotedb.collection('ArticleParser');


        MongoClient.connect("mongodb://localhost:27017/articledb", function(err, localdb) {
            if (err) {
                return console.dir(err);
            }
            var localArticlecol = localdb.collection('ArticleParser');
            var cursor = localArticlecol.find({
                isPushed: {
                    $exists: false
                }
            });

            (function startCursor() {
                cursor.next(function(err, r) {
                    if(err){
                        return console.log(err);
                    }
                    var originlId = r._id;
                    delete r._id;
                    console.log('originlId', originlId);

                    remoteArticlecol.insertOne(r, function(err, r) {
                        if(err){
                            console.log('err remote', err);
                        }else{
                            console.log('insert', originlId);
                        }
                        localArticlecol.findOneAndUpdate({
                            _id: originlId
                        }, {
                            $set: {
                                isPushed: true
                            }
                        }, function(err, r) {
                            if (err) {
                                console.log(err);
                            }
                            startCursor();
                        });
                    });

                });
            })();
        });
    });
}

synLocalArticleToRemove();
//updateArtcelIdField();
//updateUrlIdField();
//updateCreatedDate_v2();

setTimeout(function() {
    exec("forever restart playground.js", function(error, stdout, stderr) {
        if (error) {
            console.log(error);
            return;
        }
        if (stdout) {
            console.log(stdout);
        }
    });
}, 10 * 60000);

//updateIsArticleFalse();
//initdb();