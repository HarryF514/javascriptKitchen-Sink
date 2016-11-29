var ArticleParser = require('article-parser');

var url = 'http://china.huanqiu.com/photo/2016-11/2853190.html';

// ArticleParser.extract(url).then((article) => {
//   console.log(article);
// }).catch((err) => {
//   console.log(err);
// });

ArticleParser.extract(url).then(function(data){
    console.log(data);
})