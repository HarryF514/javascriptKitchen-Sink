var Crawler = require("crawler");
var url = require('url');
var cache = require('memory-cache');
var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';

function log(s) {
    console.log(s);
}

//var c = ;

var queueObj = {
    urlArray: [],
    patt: /(http:\/\/)/,
    c: new Crawler({
        maxConnections: 1,
        skipDuplicates: true,
        cache: true,
        forceUTF8: true,
        onDrain: function () {
            log("a finished,no more queue");
        },
        callback: function (error, result, $) {
            try {
                $('a').each(function (index, a) {
                    var toQueueUrl = $(a).attr('href');

                    if (queueObj.patt.test(toQueueUrl)) {

                        if (cache.get(toQueueUrl)) {

                        } else {
                            cache.put(toQueueUrl, true);
                            queueObj.urlArray.push(toQueueUrl);
                        }

                    }
                });
                log(queueObj.urlArray.length);

            } catch (e) {
                log(e);
            }
            queueObj.callback();
        }
    })
}



function idMaker(){
    var index = 0;
    
    return {
       next: function(){
           return {value: index++, done: false};
       }
    };
}

var it = idMaker();

var saveToParse = {
    check:function(url){
        var Article = Parse.Object.extend("Article");
        var query = new Parse.Query(Article);
        query.equalTo("url", url);
        return query.find();
    },
    save:function(url){
        var TestObject = Parse.Object.extend("Article");
        var testObject = new TestObject();
        return saveToParse.check(url).then(function(results){
            if(results.length > 0){

            }else{
                return testObject.save({url:url});
            }
        })
    }
}

queueObj.c.queue('http://www.huanqiu.com/');
queueObj.callback = function(){
    saveToParse.save(queueObj.urlArray[it.next().value]);
}


