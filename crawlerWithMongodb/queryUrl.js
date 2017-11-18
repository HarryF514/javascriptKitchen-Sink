/*
 * @Author: Harry Feng
 * @Date:   2017-11-09 16:54:14
 * @Last Modified by:   Harry Feng
 * @Last Modified time: 2017-11-10 17:36:28
 */

var request = require('request'),
    cheerio = require('cheerio');
var jsdom = require('jsdom');
const queryString = require('query-string');
var exec = require('child_process').exec;


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
        if (body === undefined) {
            parse('http://localhost:3000/');
            return;
        }
        try {
            var obj = JSON.parse(body);
        } catch (e) {
            console.log('body error: ', e);
            parse('http://localhost:3000/');
            return
        }

        console.log('obj.url', obj.url);
        request(obj.url, function(error, response, body) {
            try {
                // statements
                var $ = cheerio.load(body);
            } catch (e) {
                // statements
                console.log(e);
                parse('http://localhost:3000/');
                return;

            }

            var requestBody = [];
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
                            requestBody.push(obj);
                        }
                    }
                }
            });

            request.post({
                url: 'http://localhost:3000/save',
                form: {
                    data: JSON.stringify(requestBody)
                }
            }, function(error, response, body) {
                parse('http://localhost:3000/');
                if (error) {
                    return console.log('error', error)
                } else {
                    console.log('body', body);
                }
            })
        })
    })
}

parse('http://localhost:3000/');

setTimeout(function() {
    exec("forever restart queryUrl.js", function(error, stdout, stderr) {
        if (error) {
            console.log(error);
            return;
        }
        if (stdout) {
            console.log(stdout);
        }
    });
}, 60000);