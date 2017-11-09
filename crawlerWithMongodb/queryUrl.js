/*
 * @Author: Harry Feng
 * @Date:   2017-11-09 16:54:14
 * @Last Modified by:   Harry Feng
 * @Last Modified time: 2017-11-09 17:33:20
 */

var request = require('request'),
	cheerio = require('cheerio');
var jsdom = require('jsdom');
const queryString = require('query-string');

function parse(url) {
	request(url, function(error, response, body) {

		console.log('body', body);
		var obj = JSON.parse(body);
		request(obj, function(error, response, body) {
			var $ = cheerio.load(body);
			$('a').prop
			console.log('jjj', $('a').prop)
			$('a').each(function(index, a) {
				var toQueueUrl = $(this).prop('href').split('#')[0];
				var text = $(a).text().trim().replace(" ", "");
				if (!/.*[\u4e00-\u9fa5]+.*$/.test(text)) {
					//alert("没有包含中文");
					//console.log('no chinese', text);
				} else {
					//alert("包含中文");
					if (toQueueUrl.indexOf("http://") == 0) {
						var objectId = new ObjectID().toString();
						col.insertOne({
							url: toQueueUrl,
							id: objectId,
							title: text,
							titleLength: text.length,
							urlDomain: getDomain(toQueueUrl),
							isQueue: false,
							isArticle: false,
							qualityPercentage: -1
						}, function(err, r) {
							if (err) {
								console.log('err ', err);
							} else {
								console.log('inserted ', text)
							}
						});
					}
				}
			});
		})
	})
}

parse('http://localhost:3000/');