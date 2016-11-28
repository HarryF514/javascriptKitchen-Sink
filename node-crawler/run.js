var Crawler = require("crawler");
var url = require('url');
var AV = require('leanengine');
AV.initialize("qIHr8eVejy878hTk3jBLzpC4-gzGzoHsz", "xEHOYUKDehIJ8h2HbHs1pTCg", "KJX9Mo2jgUiwXrRbLEVP3WyR");
var extractor = require('unfluff');
var jsonfile = require('jsonfile')

var patt = /(https:\/\/techcrunch.com)\/20/;

function log(s) {
    console.log(s);
}

var c = new Crawler({
    maxConnections: 1,
    skipDuplicates: true,
    cache:true,
    forceUTF8: true,
    onDrain:function(){
      log("finished,no more queue");
    },
    callback: function (error, result, $) {

        $('a').each(function (index, a) {
            var toQueueUrl = $(a).attr('href');

            c.queue(toQueueUrl);

        });
    }
});



c.queue('http://techcrunch.com/');

