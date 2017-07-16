//var Crawler = require("crawler");
//var url = require('url');
//var jsdom = require('jsdom');
//var c = new Crawler({
//    maxConnections : 10,
//    jQuery: jsdom,
//    // This will be called for each crawled page
//    callback : function (error, res, $) {
//        if(error){
//            console.log(error);
//        }else{
//            //var $ = res.$;
//            // $ is Cheerio by default
//            //a lean implementation of core jQuery designed specifically for the server
//            try{
//                console.log($("title").text());
//                $('a').each(function (index, a) {
//                    var toQueueUrl = $(a).prop('href');
//                    //console.log(toQueueUrl);
//                    c.queue(toQueueUrl);
//                });
//            }catch (e){
//
//            }
//
//        }
//        //done();
//    }
//});
//
//c.queue('http://www.wandoujia.com/');


var Crawler = require("crawler");
var url = require('url');
var jsdom = require('jsdom');
var c = new Crawler({
    maxConnections : 100,
    //jQuery: jsdom,
    //timeout: 5000,
    // This will be called for each crawled page
    callback : function (error, result, $) {
        // $ is Cheerio by default
        //a lean implementation of core jQuery designed specifically for the server
        if(error){
            //console.log(error);
        }else{

            try {
                //console.log($("title").text());
                $('a').each(function (index, a) {
                    var toQueueUrl = $(a).attr('href');
                    console.log(toQueueUrl);
                    c.queue(toQueueUrl);
                });

            } catch (e) {
                //console.log(e);
            }
        }
    }
});

c.queue('http://www.wandoujia.com/');