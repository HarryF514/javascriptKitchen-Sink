var ArticleParser = require('article-parser');

var url = 'http://blog.csdn.net/shaderdx/article/details/53693978';

// ArticleParser.extract(url).then((article) => {
//   console.log(article);
// }).catch((err) => {
//   console.log(err);
// });

ArticleParser.extract(url).then(function(data){
    console.log(data);
})