/*
 * @Author: Harry Feng
 * @Date:   2017-11-02 16:48:59
 * @Last Modified by:   Harry Feng
 * @Last Modified time: 2017-11-02 17:00:14
 */

var page = require('webpage').create();
page.open('http://weixin.sogou.com/', function(status) {
	page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
		page.evaluate(function() {
			$("a").text();
		});
		phantom.exit()
	});
});


// var page = require('webpage').create();
// page.open('http://weixin.sogou.com/', function() {
// 	page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
// 		page.evaluate(function() {
// 			$("a").each(function() {
// 				console.log('a', $(this).text());
// 			})
// 		});
// 		phantom.exit()
// 	});
// });