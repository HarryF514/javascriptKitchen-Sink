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

    var go = {
        findUrl:function(){
            col.findOne({numberLength:{$exists:false}},function(err,docs){
                var numberLength = docs.url.replace(/[^0-9]/g,"").length
                //log("going to queue" + docs.url);
                col.updateMany({url:docs.url}, {$set: {numberLength: numberLength}},function(){
                    //log("update url " + docs.url);
                    go.findUrl();
                });
            })
        }
    }

    setInterval(function(){
        col.count({numberLength:{$exists:false}}, function(err, count) {
            log("left " + count);
        })
    },1000);



    go.findUrl();
    col.createIndex( { "url": 1 }, { unique: true } )
})