var request = require('request');

var ArticleParser = require('article-parser');

ArticleParser.configure({
    timeout: 15 * 1000
});
(function go() {
    request('http://9i9icenter.com/db/getUrl', function(error, response, body) {
        if (error) {
            return console.log('error', error);
        };
        if (body && JSON.parse(body) && JSON.parse(body).url) {
            ArticleParser.extract(JSON.parse(body).url).then(function(article) {
                console.log('article.content.length', article.content.length);
                if (article.content.length > 2000) {
                    request.post({
                        url: 'http://9i9icenter.com/db/addArticle',
                        form: article
                    }, function(error, response, body) {
                        go();
                        if (error) {
                            return console.log('error', error);
                        }
                        //console.log('body', body);
                    });
                } else {
                    go();
                }
            });
        } else {
            go();
        }

    })
})();