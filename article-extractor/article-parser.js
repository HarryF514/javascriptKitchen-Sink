var ArticleParser = require('article-parser');

var url = 'http://shop.zhe800.com/products/ze161204231608567180?jump_source=1&qd_key=qyOwt6Jn';

// ArticleParser.extract(url).then((article) => {
//   console.log(article);
// }).catch((err) => {
//   console.log(err);
// });

ArticleParser.extract(url).then(function(data){
    console.log(data);
})