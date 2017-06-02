/*
* @Author: harryfeng
* @Date:   2017-06-01 16:35:09
* @Last Modified by:   harryfeng
* @Last Modified time: 2017-06-01 16:47:18
*/

'use strict';

var Crawler = require("crawler");
var _ = require("underscore");
var ArticleParser = require('article-parser');
var jsdom = require('jsdom');
var url = require('url');
var exec = require('child_process').exec;

var Db = require('mongodb').Db,
MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server,
ReplSetServers = require('mongodb').ReplSetServers,
ObjectID = require('mongodb').ObjectID,
Binary = require('mongodb').Binary,
GridStore = require('mongodb').GridStore,
Grid = require('mongodb').Grid,
Code = require('mongodb').Code,
assert = require('assert');

var initdb = function(){
	function log(s){
		console.log(s);
	}

	MongoClient.connect("mongodb://localhost:27017/articledb", function(err, db) {
		if(err) { return console.dir(err); }
		var col = db.collection('Url');
		function startInsert(){
			var ran_number = Math.random();
			col.insert({ url: "http://bbs.51.ca/member.php?mod"+ran_number, title: 't'+ ran_number },function(){
				console.log("random number", ran_number);
				startInsert();
			})
		}
		startInsert();
	});
}


initdb();