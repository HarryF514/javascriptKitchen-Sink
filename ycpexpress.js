const express = require('express')
const app = express()
var Datastore = require('nedb'),
    db = new Datastore({
        filename: 'nedb_partner.db',
        autoload: true
    });


app.get('/', function (req, res) {
   db.findOne({isSent:{$exists:false}}).sort({ last_login: -1 }).exec(function (err, doc) {
	if(err){return console.log(err)};
        res.json(doc);
       db.update({ id: doc.id }, { $set: { isSent: true } }, { multi: true }, function (err, numReplaced) {
      });
    });
  //res.send('Hello World!')
})

app.listen(9001, function () {
  console.log('Example app listening on port 9001!')
})
