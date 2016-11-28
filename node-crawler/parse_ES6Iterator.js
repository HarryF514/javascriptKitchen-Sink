var Crawler = require("crawler");
var url = require('url');
var cache = require('memory-cache');
var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';

var urlArray = [];
var patt = /(http:\/\/)/;
function log(s) {
    console.log(s);
}

//var c = ;

var queueObj = {
    urlArray:[],
    patt:/(http:\/\/)/,
    c:new Crawler({
    maxConnections: 1,
    skipDuplicates: true,
    cache:true,
    forceUTF8: true,
    onDrain:function(){
      log("a finished,no more queue");
    },
    callback: function (error, result, $) {
        try {
            $('a').each(function (index, a) {
                var toQueueUrl = $(a).attr('href');
                
                if (patt.test(toQueueUrl)) {
                    
                }

                if (patt.test(toQueueUrl)) {
                    
                    if (cache.get(toQueueUrl)) {

                    } else {
                        cache.put(toQueueUrl, true);
                        urlArray.push(toQueueUrl);
                    }
                    
                }
            });
            log(urlArray.length);

        } catch (e) {

        }
    }
})
}

c.queue('http://www.huanqiu.com/');


