var MongoClient = require('mongodb').MongoClient

var remote_db = null
MongoClient.connect('mongodb://139.59.252.180:27017/test', function(err, database) {
	if (err) {
		console.log(err);
		return
	}
	console.log(database);
	remote_db = database
	//remote_insert_many(remote_db);
	
});

function remote_insert_many(db,obj_array) {
	var col = db.collection('insert_many');
	var col = db.collection('insert_many');
	col.insertMany(obj_array, function(err, r) {
		db.close();
	});
}