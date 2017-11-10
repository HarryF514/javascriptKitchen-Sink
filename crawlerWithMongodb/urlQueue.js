/*
 * @Author: Harry Feng
 * @Date:   2017-11-09 12:59:43
 * @Last Modified by:   Harry Feng
 * @Last Modified time: 2017-11-10 16:24:02
 */
const Db = require('mongodb').Db,
	MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server,
	ReplSetServers = require('mongodb').ReplSetServers,
	ObjectID = require('mongodb').ObjectID,
	Binary = require('mongodb').Binary,
	GridStore = require('mongodb').GridStore,
	Grid = require('mongodb').Grid,
	Code = require('mongodb').Code,
	assert = require('assert');
const express = require('express');
const queryString = require('query-string');
var bodyParser = require('body-parser');
var _ = require('underscore');


const app = express()
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));
var db;
var col;
var urlArray = [];
var url = require('url');

function connect(callback) {
	MongoClient.connect("mongodb://localhost:27017/articledb", {
		keepAlive: 3000000,
		connectTimeoutMS: 3000000,
		socketTimeoutMS: 3600000
	}, (err, database) => {
		if (err) {
			return err;
		} else {
			callback(database);
		}
	});
}
connect(function(database) {
	console.log('database', 'connected');
	db = database;
	col = db.collection('Url');
	getUrl(function(urls) {
		console.log('init url succeed')
		urlArray = urlArray.concat(urls);
	});
});

function getUrl(callback) {
	col.find({
		isQueue: false
	}).limit(3000).toArray(function(err, docs) {
		if (err) {
			return console.log(err);
		} else {
			callback(docs);
		}
	})
}

function updateUrl(url) {
	col.updateMany({
		url: url
	}, {
		$set: {
			isQueue: true
		}
	}, function(err,r){
		if(err){
			return console.log('updateUrl err', err);
		}else{
		}
	});
}

setInterval(function() {
	if (urlArray <= 1000) {
		getUrl(function(urls) {
			urlArray = urlArray.concat(urls);
		});
	}
}, 10000);

app.get('/', (req, res) => {
	var resultUrl = urlArray.shift();
	updateUrl(resultUrl.url);
	res.json(resultUrl)
})

app.post('/save', (req, res) => {
	var urlObj = req.body;
	if(urlObj) {
		var dataArray = JSON.parse(urlObj.data)
	}
	_.each(dataArray, function(element, index, list){
		var objectId = new ObjectID().toString();
		element.id = objectId;
	});
	console.log('dataArray', dataArray[0])
	col.insertMany(dataArray, function(err, r){
		if(err){
			res.send(err);
		}else{
			console.log('inserted', new Date())
			res.send(true);
		}
	});
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))