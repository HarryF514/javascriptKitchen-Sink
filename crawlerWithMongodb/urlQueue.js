/*
 * @Author: Harry Feng
 * @Date:   2017-11-09 12:59:43
 * @Last Modified by:   Harry Feng
 * @Last Modified time: 2017-11-09 16:14:27
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
const express = require('express')
const app = express()
var db;
var col;
var urlArray = [];

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
		urlArray = urlArray.concat(urls);
	});
});

function getUrl(callback) {
	col.find({
		isQueue: false
	}).limit(1000).toArray(function(err, docs) {
		if (err) {
			return console.log(err);
		} else {
			callback(docs);
		}
	})
}

function updateUrl() {
	
}

setInterval(function() {
	if (urlArray <= 500) {
		getUrl(function(urls) {
			urlArray = urlArray.concat(urls);
		});
	}
}, 10000);

app.get('/', (req, res) => {
	res.json(urlArray.shift())
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))