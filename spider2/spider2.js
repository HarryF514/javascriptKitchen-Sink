var _ = require("underscore");
var Spider = require('spider2');
var spider = Spider({
    debug      : true,
    workers    : 7,
    concurrency: 1
});
spider.on('error', function(err, req){
    if (req.worker) {
        console.error('worker #', req.worker, 'has an error:', err.message);
    } else {
        console.error(req.uri, err.message);
    }
});
spider.on('data', function(req, res){
    if (req._type == Spider.type.LINK) {
        spider.read(_.filter(res, validLink));
    } else if (req._type == Spider.type.ARTICLE) {
        console.log(res);
    }
});
spider.on('end', function(){
    console.log('[END]');
});

spider.read("http://blog.csdn.net/shaderdx/article/details/53693978");
