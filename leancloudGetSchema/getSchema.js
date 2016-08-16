var request = require('request');
var md5 = require('md5');

//var appId = "Kw627Ha1JP32IUOymijqLJe1-gzGzoHsz";
//var appKey = "PlUKtpbqSLVs46xWPrMYXDNn";
//var masterKey = "PdcRl6OLQ1jljTy5oTJkBenK";
//var sign = md5(Date.now() + masterKey)
//var signedTimeKey = sign + "," + Date.now() + "," + "master";
//var signedKey = sign + "," + "master";
//
//var options = {
//    url: ' https://api.leancloud.cn/1.1/schemas',
//    headers: {
//        "X-LC-Id": appId,
//        "X-LC-Key": masterKey + "," + "master"
//    }
//};

function makeRequestOption(appId,appKey,masterKey){
    var sign = md5(Date.now() + masterKey)
    var signedTimeKey = sign + "," + Date.now() + "," + "master";
    var signedKey = sign + "," + "master";
    var options = {
        url: ' https://api.leancloud.cn/1.1/schemas',
        headers: {
            "X-LC-Id": appId,
            "X-LC-Key": masterKey + "," + "master"
        }
    };
    return options;
}

//function callback(error, response, body) {
//    if (!error && response.statusCode == 200) {
//        var info = JSON.parse(body);
//        console.log(info);
//    } else {
//        console.log(JSON.stringify(error));
//        console.log(JSON.stringify(response));
//    }
//}

request(makeRequestOption("Kw627Ha1JP32IUOymijqLJe1-gzGzoHsz","PlUKtpbqSLVs46xWPrMYXDNn","PdcRl6OLQ1jljTy5oTJkBenK"), function(error, response, body){
    if (!error && response.statusCode == 200) {
        var firstSchema = JSON.parse(body);
        console.log(firstSchema.xyqStudent);

        request(makeRequestOption("OAsq3BaUejlty6HR5y6LtoOA-gzGzoHsz","rY459mImPgBLwM4H78n3lbzI","plvu0fCSPGdW3KcsmzUpff5a"), function(error, response, body){
            var secondSchema = JSON.parse(body);
            console.log(secondSchema.xyqStudent);
        });

    } else {
        console.log(JSON.stringify(error));
        console.log(JSON.stringify(response));
    }
});