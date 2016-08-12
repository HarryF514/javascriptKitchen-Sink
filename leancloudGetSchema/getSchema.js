var request = require('request');
var md5 = require('md5');

var appId = "lCJUTtFR0fy55NddqvfQyXfw-gzGzoHsz";
var appKey = "cLrB4KiuJw9PubqJi8uiopAv";
var masterKey = "7A0J0DvQxjniGvd2rl9u2BGE";
var sign = md5(Date.now() + masterKey)
console.log(Date.now());
console.log(sign);
var signedTimeKey = sign + "," + Date.now() + "," + "master";
var signedKey = sign + "," + "master";
console.log(signedKey);

var options = {
    url: ' https://api.leancloud.cn/1.1/schemas',
    headers: {
        "X-LC-Id": appId,
        "X-LC-Key": masterKey + "," + "master"
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info.xyqStudent);
    } else {
        console.log(JSON.stringify(error));
        console.log(JSON.stringify(response));
    }
}

request(options, callback);