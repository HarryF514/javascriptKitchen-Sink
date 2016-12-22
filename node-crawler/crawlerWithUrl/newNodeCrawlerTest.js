var Crawler = require("crawler");
var url = require('url');
var gloCallBackCount = 0;
var gloCallBackCount2= 0;
var c = new Crawler({
    maxConnections: 100,
    // This will be called for each crawled page
    callback: function (error, res, done) {
        gloCallBackCount++;
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            console.log($);
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            try{
                //console.log($("title").text());
                $('a').each(function (index, a) {
                    try {
                        var toQueueUrl = $(a).prop('href').split('#')[0];
                        if (toQueueUrl.indexOf("http") == 0) {
                            c.queue(toQueueUrl);
                        }
                    } catch (e) {

                    }
                });
            }catch (erro){

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
