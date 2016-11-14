var extractor = require('article-extractor');

//extractor.extractData('http://paulgraham.com/altair.html', function (err, data) {
//    console.log(data);
//});

extractor.extractData('http://stackoverflow.com/questions/40588189/how-to-retrieve-data-for-radio-button-value-and-select-the-radio-button-from-sql', function (err, data) {
    console.log(data);
});