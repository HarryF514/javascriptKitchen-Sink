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
var c = new Crawler({
    maxConnections: 1,
    skipDuplicates: true,
    cache:true,
    forceUTF8: true,
    onDrain:function(){
      log("finished,no more queue");
    },
    // This will be called for each crawled page
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

        var result = cache.get("result");
        if (!result) {
            cache.put("result", []);
            result = [];
        }

        result.push(saveobj);
        cache.put("result", result);
        log(result.length);
        if (result.length == 50) {

            var previousResult = jsonfile.readFileSync("techcrunch.com.json");

            var newResult = previousResult.concat(result);
            jsonfile.writeFileSync("techcrunch.com.json",newResult , {spaces: 2});
            cache.put("result", []);
        }


        try {
            $('a').each(function (index, a) {
                var toQueueUrl = $(a).attr('href');

                if (patt.test(toQueueUrl)) {
                    if (cache.get(toQueueUrl)) {

                    } else {
                        log("star to queue");
                        cache.put(toQueueUrl, true);
                        c.queue(toQueueUrl);
                    }
                }
            });
        } catch (e) {

        }
    }
});

function makeArtileDom(mainText){
    var data = extractor(mainText, 'en');
    var text = data.text.substring(0,6000);
    var content = "<p>" + text.replace(/\n\n/g,"</p><p>") + "</p>";
    return content;
}


function checkBeforeQueue(){
    var previousResult = jsonfile.readFileSync("techcrunch.com.json");
    for(var i = 0;i<previousResult.length;i++){
        log(previousResult[i].url);
        cache.put(previousResult[i].url, true);
    }
    c.queue('https://techcrunch.com/2016/08/25/whatsapp-plans-to-let-businesses-on-to-its-service-before-the-end-of-the-year/');
}
// Queue just one URL, with default callback
checkBeforeQueue();