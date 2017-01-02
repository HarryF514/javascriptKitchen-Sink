var Crawler = require("crawler");
var url = require('url');
var gloCallBackCount = 0;
var gloCallBackCount2= 0;
var _ = require("underscore");
var UrlUtil = require("./UrlUtil.js");

var nonDomainKeyWord = require("./nonDomainKeyWord");


var c = new Crawler({
    maxConnections: 20,
    // This will be called for each crawled page
    callback: function (error, res, done) {
        gloCallBackCount++;
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            //console.log($);
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            try{
                //console.log($("title").text());
                var toQueueUrlArray = [];
                $('a').each(function (index, a) {
                    try {
                        var toQueueUrl = $(a).prop('href').split('#')[0];
                        if (toQueueUrl.indexOf("http") == 0) {
                            //c.queue(toQueueUrl);
                            if (nonDomainKeyWord.hasNonDomainKeyWords(toQueueUrl)) {

                            } else {

                                toQueueUrlArray.push(toQueueUrl);
                            }
                        }
                    } catch (e) {
                        //console.log(e);
                    }
                });
                //console.log(toQueueUrlArray);
                toQueueUrlArray = _.uniq(toQueueUrlArray);
                _.each(toQueueUrlArray, function (element, index, list) {
                    UrlUtil.saveUrl(element);
                    c.queue(element);
                    //console.log("aa");
                })

            } catch (erro) {
                console.log(erro);
            }

        }
        done();
    }
});

setInterval(function(){
    console.log("gloCallBackCount " + (gloCallBackCount - gloCallBackCount2));
    gloCallBackCount2 = gloCallBackCount;
},1500);

// Queue just one URL, with default callback
c.queue('http://blog.csdn.net/');
