var Crawler = require("crawler");
var url = require('url');
var NodeCache = require('node-cache');
var cache = new NodeCache();
var AV = require('leanengine');
AV.initialize("qIHr8eVejy878hTk3jBLzpC4-gzGzoHsz", "xEHOYUKDehIJ8h2HbHs1pTCg", "KJX9Mo2jgUiwXrRbLEVP3WyR");

var leancloudExtension = require("../leancloudExtension/leancloudExtension.js");
function log(s) {
    console.log(s);
}
var counter = 0;
var cacheResult;
var c = new Crawler({
    maxConnections: 1000,
    skipDuplicates: true,
    forceUTF8: true,
    onDrain:function(){
        log("finished,no more queue");
    },
    // This will be called for each crawled page
    callback: function (error, result, $) {
        //requestLogger(require('http'))


        var content = "";
        var title = "";
        var url = "";
        try{
            content = $('.co_area2 #Zoom').text().trim();
            title = $('.co_area2 .title_all h1').text().trim();
            url = result.uri
            log(url);
        }catch (e){

        }



        var todoFolder = new AV.Object('zgDytt8PureText');
        todoFolder.set('content', content);
        todoFolder.set('title', title);
        todoFolder.set('url', url);

        cacheResult = cache.get("result");

        if (!cacheResult) {
            cache.set("result", []);
            cacheResult = [];
        }

        checkTitle(title).then(function(movieResults){
            if(movieResults.length > 0){
                log(title + " exist");
                movieResults[0].set("url",url);
                movieResults[0].save().then(function(){
                    //log("update url");
                });
            }else{
                cacheResult.push(todoFolder);
                cache.set("result", cacheResult);
                //log(title + " is new");
                log(cacheResult.length);

                if (cacheResult.length > 30) {
                    AV.Object.saveAll(cacheResult).then(function () {
                        log("success");
                    }, function (error) {
                        log(error);
                    });
                    cache.set("result", []);
                    log("clear lean result");
                    //return;
                }

            }
        }).catch(function(error) {
            log("leancloud error");
            log(error);
        });


        try {
            $('a').each(function (index, a) {
                var toQueueUrl = "http://www.dytt8.net" + $(a).attr('href').trim();

                if (toQueueUrl && toQueueUrl.indexOf('gndy') >= 0) {

                    if (cache.get(toQueueUrl)) {
                        //log(toQueueUrl + " has cache");
                    } else {
                        cache.set(toQueueUrl, true);

                        c.queue(toQueueUrl);
                    }
                }
            });
        } catch (e) {

        }
    }
});

function checkTitle(title){
    var query = new AV.Query('zgDytt8PureText');
    query.ascending("updatedAt");
    // 查询 priority 是 0 的 Todo
    query.equalTo('title', title);
    return query.find();
}

function cacheAllUrl(){
    leancloudExtension.getAllItemsByClassName.run("zgDytt8PureText",function(results){
        for(var i=0;i<results.length;i++){
            log("cache " + results[i].get("url"));
            if(results[i].get("url") != undefined){
                cache.set(results[i].get("url").trim(), true);
            }
        }
        c.queue('http://www.ygdy8.net/html/gndy/china/index.html');
    })
}

function requestLogger(httpModule){
    var original = httpModule.request
    httpModule.request = function(options, callback){
        console.log(options.href||options.proto+"://"+options.host+options.path, options.method)
        return original(options, callback)
    }
}

cacheAllUrl();
// Queue just one URL, with default callback
