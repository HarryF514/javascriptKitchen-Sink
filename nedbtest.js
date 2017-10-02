/*
 * @Author: harryfeng
 * @Date:   2017-10-02 10:33:52
 * @Last Modified by:   harryfeng
 * @Last Modified time: 2017-10-02 10:38:50
 */
var Datastore = require('nedb'),
    db = new Datastore({
        filename: 'nedb_test.db',
        autoload: true
    });

var doc = {
    hello: 'world',
    n: 5,
    today: new Date(),
    nedbIsAwesome: true,
    notthere: null,
    notToBeSaved: undefined // Will not be saved
        ,
    fruits: ['apple', 'orange', 'pear'],
    infos: {
        name: 'nedb'
    }
};

db.insert(doc, function(err, newDoc) { 
	console.log(err);
    // newDoc is the newly inserted document, including its _id
    // newDoc has no key called notToBeSaved since its value was undefined
});

db.count({}, function (err, count) {
  console.log(count);
});