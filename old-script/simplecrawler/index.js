var _ = require("underscore");
var ArticleParser = require('article-parser');
var Crawler = require("simplecrawler");

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




// Connect to the db
MongoClient.connect("mongodb://localhost:27017/example2", function(err, db) {
    if(err) { return console.dir(err); }

    var col = db.collection('Article');


    var crawler = new Crawler("http://www.yorkbbs.ca/");

    crawler.maxDepth = 1;

    crawler.on("fetchcomplete", function(queueItem, responseBuffer, response) {
        console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
        console.log("It was a resource of type %s", response.headers['content-type']);

        db.collection('Url').findOne({isArticle:{$exists:false}},function(err,docs){
            if(err){
                log(err);
            }

            crawler.queueURL(docs.url, null, false);

            log("going to get " + docs.url);
            db.collection('Url').updateMany({url:docs.url}, {$set: {isArticle: true}});
        })

    });

    crawler.start();
});



