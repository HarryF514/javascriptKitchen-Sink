var Crawler = require("crawler");
var url = require('url');
var jsdom = require('jsdom');
var _ = require("underscore");
var ArticleParser = require('article-parser');

var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';
function go(domainKeyWord, staringUrl) {
    function log(s) {
        //console.log(s);
    }

    function extraLog(s) {
        //console.log(s);
    }

    var queueObj = {
        urlArray: [],
        patt: /(http:\/\/)/,
        queueingUrlNumber: 0,
        domainKeyWord: domainKeyWord,
        staringUrl: staringUrl,
        c: new Crawler({
            maxConnections: 5,
            forceUTF8: true,
            retries: 1,
            jQuery: jsdom,
            retryTimeout: 2000,
            timeout: 15000,
            onDrain: function () {
                console.log("a finished,no more queue");
            },
            callback: function (error, result, $) {
                //console.log(result);
                queueObj.queueingUrlNumber--;
                try {
                        log("callback url is " + result.uri);
                        ArticleParser.extract(result.uri).then((article) => {

                        if(article.content.length > 2000){
                            saveToParseByCheckingTitle.save(article).then(function (_article) {
                                console.log("saved artile with url " + _article.get("url"));
                                console.log("saved artile with title " + _article.get("title"));
                            });
                        }
                    }).catch((err) => {
                        //console.log(err);
                });




        } catch (e)
    {

    }
    if (error) {
        log("callback error");
        log(error);
    }

    try {
        $('a').each(function (index, a) {
            var toQueueUrl = $(a).prop('href');

            if (queueObj.patt.test(toQueueUrl) && toQueueUrl.indexOf(queueObj.domainKeyWord) != -1) {

                saveToParseByCheckingTitle.checkUrl(toQueueUrl).then(function(_results){
                    if(_results.length == 0){
                        //console.log(toQueueUrl);
                        queueObj.c.queue(toQueueUrl);
                    }
                })

            }

        });

    } catch (e) {
        log(e);
    }
}
})
}


var saveToParseByCheckingTitle = {
    checkUrl: function (url) {
        var Article = Parse.Object.extend("Article");
        var query = new Parse.Query(Article);
        query.equalTo("url", url);
        return query.find();
    },
    check: function (title) {
        var Article = Parse.Object.extend("Article");
        var query = new Parse.Query(Article);
        query.equalTo("title", title);
        return query.find();
    },
    save: function (obj) {
        var TestObject = Parse.Object.extend("Article");
        var testObject = new TestObject();
        return saveToParseByCheckingTitle.check(obj.title).then(function (results) {

            if (results.length > 0) {

            } else {
                return testObjectsaveToParseByCheckingTitle(obj);
            }
        })
    }
};

setInterval(function () {
    //getSimilarDomainObj.run();
    console.log(hellos);
}, 1000 * 60)


var getSimilarDomainObj = {
    run: function () {
        var query = new Parse.Query("Article");
        query.contains("url", queueObj.domainKeyWord);
        query.find().then(function (result) {
            var sample = _.sample(result, 10);
            for (var k = 0; k < sample.length; k++) {
                console.log(sample[k].get("url"));
                queueObj.c.queue(sample[k].get("url"));
            }
        })
    }
}
getSimilarDomainObj.run();
queueObj.c.queue(queueObj.staringUrl);

}


new go("http://blog.csdn.net/", "http://blog.csdn.net/");



