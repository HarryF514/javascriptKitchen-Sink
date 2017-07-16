var Crawler = require("crawler");
var url = require('url');
var cache = require('memory-cache');
var AV = require('leanengine');
AV.initialize("qIHr8eVejy878hTk3jBLzpC4-gzGzoHsz", "xEHOYUKDehIJ8h2HbHs1pTCg", "KJX9Mo2jgUiwXrRbLEVP3WyR");
var extractor = require('unfluff');
var jsonfile = require('jsonfile')

var patt = /(https:\/\/techcrunch.com)\/20/;

function log(s) {
    console.log(s);
}
var counter = 0;
var urlCounter = 0;
var urlArray = [];

var c = new Crawler({
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
                    urlArray.push(toQueueUrl);
                }
            });
            go()
        } catch (e) {

        }
    }
});


var cGetArtile = new Crawler({
    maxConnections: 1,
    skipDuplicates: true,
    cache:true,
    forceUTF8: true,
    onDrain:function(){
        log("cGetArtile finished,no more queue");
        return;
    },
    callback: function (error, result, $) {


        var englishContent = makeArtileDom(result.body);
        var title = extractor(result.body, 'en').title;
        var url = result.uri;
        log(url);
        counter++;
        log(counter);
        var saveobj = {
            content: englishContent,
            title: title,
            url:url
        }

        saveObj(saveobj);

    }
});

function saveObj(obj){
    var tag = new AV.Object('techcrunchNews');
    urlCounter=0;
    return tag.save(obj);
}

function startToCheckUrl(url){
    var query = new AV.Query('techcrunchNews');
    query.equalTo("url",url);
    return query.find();
}

function go(){
    checkUrl(function(){
        go();
    })
};


function checkUrl(callback){
    startToCheckUrl(urlArray[urlCounter]).then(function(results){
        if(results.length > 0){
            urlCounter++;
            if(callback){
                callback();
            }
        }else{
            cGetArtile.queue(urlArray[urlCounter]);
        }
    })
}




function makeArtileDom(mainText){
    var data = extractor(mainText, 'en');
    var text = data.text.substring(0,6000);
    var content = "<p>" + text.replace(/\n\n/g,"</p><p>") + "</p>";
    return content;
}


c.queue('http://techcrunch.com/');

