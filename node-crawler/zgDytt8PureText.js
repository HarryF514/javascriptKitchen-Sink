var Crawler = require("crawler");
var url = require('url');
var cache = require('memory-cache');
var AV = require('leanengine');
AV.initialize("qIHr8eVejy878hTk3jBLzpC4-gzGzoHsz", "xEHOYUKDehIJ8h2HbHs1pTCg", "KJX9Mo2jgUiwXrRbLEVP3WyR");

function log(s) {
    console.log(s);
}
var counter = 0;
var c = new Crawler({
    maxConnections: 10,
    skipDuplicates: true,
    forceUTF8: true,
    // This will be called for each crawled page
    callback: function (error, result, $) {


        var content = $('.co_area2 #Zoom').text().trim();
        var title = $('.co_area2 .title_all h1').text().trim();

        var todoFolder = new AV.Object('zgDytt8PureText');
        todoFolder.set('content', content);
        todoFolder.set('title', title);

        var saveobj = {
            content: content,
            title: title
        }
        var result = cache.get("result");
        if (!result) {
            cache.put("result", []);
            result = [];
        }

        result.push(todoFolder);
        cache.put("result", result);
        log(result.length);
        if (result.length == 100) {
            AV.Object.saveAll(result).then(function () {
                log("success");
            }, function (error) {
                log(error);
            });
            cache.put("result", []);
        }
        try {
            $('a').each(function (index, a) {
                var toQueueUrl = $(a).attr('href');

                if (toQueueUrl && toQueueUrl.indexOf('gndy') >= 0) {

                    if (cache.get(toQueueUrl)) {

                    } else {
                        cache.put(toQueueUrl, true);

                        c.queue("http://www.dytt8.net" + toQueueUrl);
                    }
                }
            });
        } catch (e) {

        }
    }
});

// Queue just one URL, with default callback
c.queue('http://www.dytt8.net/html/gndy/dyzz/20130301/41553.html');