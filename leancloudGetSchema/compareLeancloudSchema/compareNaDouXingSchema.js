var request = require('request');
var md5 = require('md5');

var diff = require('deep-diff').diff;

var dbInfoA = {
    appName:"纳豆行安卓",
    appId:"mlEKjMnwlqumTI62sp3tL48S-gzGzoHsz",
    appKey:"2SsUfKiK6li7LxBNzs4dg0m8",
    masterKey:"IE7K5HLjPqYvDqMLILFNKDci"
};

var dbInfoB = {
    appName:"纳豆行Dev",
    appId:"WzJh5egSxHfgrzzku9O2imlV-gzGzoHsz",
    appKey:"jb9roobMGKupIo7DGWRAnvoq",
    masterKey:"IrPa4q9b5e6Rby0aL1yke4yn"
};

var dbInfoC = {
    appName:"纳豆行Web",
    appId:"Dmq718YEarJNmTaYSMfY9Sw4-gzGzoHsz",
    appKey:"P2CAG11vOXhRIQ4zzimbtoVc",
    masterKey:"1aWHNJ9QIHW1pAscV6bIhnr2"
};

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


request(makeRequestOption(dbInfoA.appId,dbInfoA.appKey,dbInfoA.masterKey), function(error, response, body){

    if (!error && response.statusCode == 200) {
        var firstSchema = JSON.parse(body);
        request(makeRequestOption(dbInfoB.appId,dbInfoB.appKey,dbInfoB.masterKey), function(error, response, body){
            var secondSchema = JSON.parse(body);
            var differences = diff(firstSchema, secondSchema);
            console.log("对比 " + dbInfoA.appName + " : " + dbInfoB.appName);
            console.log(differences);
        });

    } else {
        console.log(JSON.stringify(error));
        console.log(JSON.stringify(response));
    }
});

request(makeRequestOption(dbInfoC.appId,dbInfoC.appKey,dbInfoC.masterKey), function(error, response, body){

    if (!error && response.statusCode == 200) {
        var firstSchema = JSON.parse(body);
        request(makeRequestOption(dbInfoB.appId,dbInfoB.appKey,dbInfoB.masterKey), function(error, response, body){
            var secondSchema = JSON.parse(body);
            var differences = diff(firstSchema, secondSchema);
            console.log("对比 " + dbInfoC.appName + " : " + dbInfoB.appName);
            console.log(differences);
        });

    } else {
        console.log(JSON.stringify(error));
        console.log(JSON.stringify(response));
    }
});