var request = require('request');
var md5 = require('md5');

var appId = "Kw627Ha1JP32IUOymijqLJe1-gzGzoHsz";
var appKey = "PlUKtpbqSLVs46xWPrMYXDNn";
var masterKey = "PdcRl6OLQ1jljTy5oTJkBenK";
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