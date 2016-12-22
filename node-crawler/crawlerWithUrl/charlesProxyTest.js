var Crawler = require("crawler");
var url = require('url');
var _ = require("underscore");
var c = new Crawler({
    maxConnections : 100,
    proxy: 'http://localhost:8887',
    // This will be called for each crawled page
    callback : function (error, res, $) {
        if(error){
            console.log(error);
        }else{
            //var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log(res.request.uri.href);
            _.each(res.request,function(value,key){
                console.log(key);
            })

        }
    }
});

// Queue just one URL, with default callback
c.queue('http://blog.csdn.net/');