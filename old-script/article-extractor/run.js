var extractor = require('article-extractor');

//extractor.extractData('http://paulgraham.com/altair.html', function (err, data) {
//    console.log(data);
//});

extractor.extractData('http://china.huanqiu.com/article/2016-11/9738273.html?from=bdwz', function (err, data) {
    console.log(data);
});