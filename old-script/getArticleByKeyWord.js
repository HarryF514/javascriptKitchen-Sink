var Crawler = require("crawler");
var url = require('url');
var AV = require('leanengine');
AV.initialize("qIHr8eVejy878hTk3jBLzpC4-gzGzoHsz", "xEHOYUKDehIJ8h2HbHs1pTCg", "KJX9Mo2jgUiwXrRbLEVP3WyR");
var extractor = require('unfluff');
var jsonfile = require('jsonfile')

var kue = require('kue')
    , queue = kue.createQueue();
var jobs = kue.createQueue();

var redis = require("redis"),
    client = redis.createClient();

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});


//var patt = /(https:\/\/techcrunch.com)\/20/;

var patt = /(http:\/\/)/;
var urlArray = [];
var titleArray = [];
function log(s) {
    console.log(s);
}

var c = new Crawler({
    maxConnections: 1000,
    //skipDuplicates: true,
    //cache:true,
    forceUTF8: true
});

jobs.process( 'queueUrl',50, function ( job, done ) {

    log("start to queue  " + job.data.theUrl);
    setTimeout(function(){
        done();
    },20000)
    c.queue([{
        uri: job.data.theUrl,
        jquery:true,
        onDrain:function(){
            log("finished,no more queue");
            done();
        },
        callback: function (error, result,$) {
            //log("c.plannedQueueCallsCount " + c.plannedQueueCallsCount);
            try{
                var title = extractor(result.body, 'en').title;
                var url = result.uri;
                log("done with " + url);

                //log(title);
                if(title.indexOf("特朗普")>=0){
                    //log(title);
                    titleArray.push(title);
                    log(titleArray);
                    log(titleArray[titleArray.length - 1]);
                    client.set("标题：" + title, extractor(result.body, 'en'));
                    //client.set(url, extractor(result.body, 'en'));

                }
            }catch (e){

            }
            done();



//            checkUri(url,function(){
//                client.set(url, "exist");
//            });



            try {
                $('a').each(function (index, a) {
                    var toQueueUrl = $(a).attr('href');
                    //log($(a).text());
                    if(patt.test(toQueueUrl)){
                        var queueObj = {
                            toQueueUrl:toQueueUrl
                        }
                        if($(a).text().indexOf("特朗普") >= 0 ){
                            queueObj['priority'] = "high";
                        }else{
                            queueObj['priority'] = "medium";
                        }
                        urlArray.push(queueObj);
                    }
                    //createJob(toQueueUrl);
                });
                //return;
                log("urlArray.length " + urlArray.length);
                go();
            }
            catch (e){

            }

        }
    }]);
});

function createJob(queueObj){

    if (patt.test(queueObj.toQueueUrl)) {
        jobs.create( 'queueUrl', {
            title: "processing " + queueObj.toQueueUrl,theUrl:queueObj.toQueueUrl
        } ).priority( queueObj.priority).ttl(20000).save();

    }
}

var urlArrayCounter = 0;
function checkUri(callback){

    client.get(urlArray[urlArrayCounter].toQueueUrl, function(err, reply) {
        // reply is null when the key is missing
        //log(url + " " + reply);
        //log(urlArray[urlArrayCounter]);
        //return;
        //log("urlArrayCounter is " + urlArrayCounter );
        //log("urlArray.length is " + urlArray.length );
        if(urlArrayCounter == urlArray.length - 1){
            return;
        }
        client.set(urlArray[urlArrayCounter].toQueueUrl, "exist");

        if(reply == null){
            // if key is not exist
            createJob(urlArray[urlArrayCounter]);
            urlArrayCounter++;
            if(callback){
                callback();
            }
        }else{
            //log("url exist " + urlArray[urlArrayCounter].toQueueUrl);
            urlArrayCounter++;
            if(callback){
                callback();
            }
        }
    });
}

function go(){
    checkUri(function(){
        go();
    });
}

var startingUrl = "http://world.people.com.cn/n1/2016/1122/c1002-28886857.html";

var cUrljob = jobs.create( 'queueUrl', {
    title: "processing " + startingUrl,theUrl:startingUrl
} ).priority( 'high' ).save();

cUrljob.on( 'promotion', function () {
    console.log( 'renewal job promoted' );
} );

cUrljob.on( 'complete', function () {
    console.log( 'renewal job completed' );
} );

cUrljob.on( 'failed', function () {
    console.log( 'renewal job failed' );
} );

// start the UI
kue.app.listen( 3013 );
console.log( 'UI started on port 3013' );
