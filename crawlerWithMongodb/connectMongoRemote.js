var MongoClient = require('mongodb').MongoClient

var remote_db = null
MongoClient.connect('mongodb://139.59.252.180:27017/articledb', function(err, db) {
	if (err) {
		console.log(err);
		return
	}
	remote_db = db;
	var Articlecol = db.collection('ArticleParser');
	var UrlCol = db.collection('Url');
	
	Articlecol.count().then(function(docs) {
	    console.log('Articlecol.count() count', docs);
	});

	Articlecol.count({createdAt:{$exists:false}}).then(function(docs) {
	    console.log('Articlecol.count({createdAt:{$exists:false}}) count', docs);
	});
	
	UrlCol.count().then(function(docs) {
	    console.log('UrlCol.count() count', docs);
	});

	UrlCol.count({id:{$exists:false}}).then(function (docs) {
		console.log('UrlCol.count({id:{$exists:false}}) count', docs);
		db.close();
	});
});