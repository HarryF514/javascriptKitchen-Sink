/*
 * @Author: Harry Feng
 * @Date:   2017-11-09 16:54:14
 * @Last Modified by:   Harry Feng
 * @Last Modified time: 2017-11-09 17:39:47
 */

var request = require('request'),
	cheerio = require('cheerio');
var jsdom = require('jsdom');
const queryString = require('query-string');

function getDomain(url) {
	var hostname;
	//find & remove protocol (http, ftp, etc.) and get hostname

	if (url.indexOf("://") > -1) {
		hostname = url.split('/')[2];
	} else {
		hostname = url.split('/')[0];
	}

	//find & remove port number
	hostname = hostname.split(':')[0];
	//find & remove "?"
	hostname = hostname.split('?')[0];

	return hostname;
}

function parse(url) {
	request(url, function(error, response, body) {

		console.log('body', body);
		var obj = JSON.parse(body);
		request(obj, function(error, response, body) {
			var $ = cheerio.load(body);
			$('a').each(function(index, a) {

				var text = $(a).text().trim().replace(" ", "");
				if (!/.*[\u4e00-\u9fa5]+.*$/.test(text)) {
					//alert("没有包含中文");
					//console.log('no chinese', text);
				} else {
					if ($(this).prop('href')) {
						var toQueueUrl = $(this).prop('href').split('#')[0];
						//alert("包含中文");
						if (toQueueUrl.indexOf("http://") == 0) {
							//var objectId = new ObjectID().toString();
							var obj = {
								url: toQueueUrl,
								title: text,
								titleLength: text.length,
								urlDomain: getDomain(toQueueUrl),
								isQueue: false,
								isArticle: false,
								qualityPercentage: -1
							};
							const stringified = queryString.stringify(obj);
							console.log('stringified', stringified);
							
						}
					}

				}
			});
		})
	})
}

parse('http://localhost:3000/');