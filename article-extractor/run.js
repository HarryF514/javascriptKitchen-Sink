var extractor = require('article-extractor');

//extractor.extractData('http://paulgraham.com/altair.html', function (err, data) {
//    console.log(data);
//});

extractor.extractData('https://techcrunch.com/2016/11/15/samantha-payne-of-open-bionics-3d-prosthetics-to-speak-at-disrupt-london-dec-5-6/', function (err, data) {
    console.log(data);
});