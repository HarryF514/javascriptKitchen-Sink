var request = require('request');
var md5 = require('md5');

var diff = require('deep-diff').diff;

var dbInfoA = {
    appName:"纳豆行Development",
    appId:"WzJh5egSxHfgrzzku9O2imlV-gzGzoHsz",
    appKey:"jb9roobMGKupIo7DGWRAnvoq",
    masterKey:"IrPa4q9b5e6Rby0aL1yke4yn"
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
        console.log(firstSchema.ndGuestUser);
        console.log(Object.keys(firstSchema.ndGuestUser)[1]);
        console.log(Object.keys(firstSchema.ndGuestUser)[1] + " | " + JSON.stringify(firstSchema.ndGuestUser[Object.keys(firstSchema.ndGuestUser)[1]]['comment']) + "| " + JSON.stringify(firstSchema.ndGuestUser[Object.keys(firstSchema.ndGuestUser)[1]]['type']));
        var jsonArray = [];

        for(i=0;i<20;i++){
            var json = {};
            for(key in firstSchema){
                if(firstSchema[key][Object.keys(firstSchema[key])[i]]&&firstSchema[key][Object.keys(firstSchema[key])[i]]['comment']){
                    var comment = firstSchema[key][Object.keys(firstSchema[key])[i]]['comment'];
                }
                if(firstSchema[key][Object.keys(firstSchema[key])[i]]&&firstSchema[key][Object.keys(firstSchema[key])[i]]['type']){
                    var type = firstSchema[key][Object.keys(firstSchema[key])[i]]['type'];
                }
                if(comment != ""){
                    json[key] = Object.keys(firstSchema[key])[i] + " | " + JSON.stringify(comment) + "| " + JSON.stringify(type);
                }
                comment = "";
                type = "";
            }
            jsonArray.push(json);
        }
        console.log(jsonArray);
        //return;
        var json2xls = require('json2xls');
        var fs = require('fs');

        var json = {
            foo: 'bar',
            qux: 'moo',
            poo: 123,
            stux: new Date()
        }

        var json2 = {
            foo: 'bar',
            qux: 'moo',
            stux: new Date()
        }

        var xls = json2xls(jsonArray);

        fs.writeFileSync('data1.xlsx', xls, 'binary');
    } else {
        console.log(JSON.stringify(error));
        console.log(JSON.stringify(response));
    }
});
// json to excel;
