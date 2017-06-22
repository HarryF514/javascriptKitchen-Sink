var MongoClient = require('mongodb').MongoClient
var assert = require('assert')
var express = require('express')
var app = express()

var db = null
MongoClient.connect('mongodb://139.59.252.180:27017/test', function(err,database) {
	if(err){
	console.log(err);
	return
}
console.log(database);
    assert.equal(err,null)
    db = database
})
