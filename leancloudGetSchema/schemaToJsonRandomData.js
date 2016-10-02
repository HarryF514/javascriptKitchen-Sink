var request = require('request');
var md5 = require('md5');
var jsonfile = require('jsonfile')
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

function log(string){
    console.log(string);
}

request(makeRequestOption(dbInfoA.appId,dbInfoA.appKey,dbInfoA.masterKey), function(error, response, body){

    if (!error && response.statusCode == 200) {
        var firstSchema = JSON.parse(body);
        //log(firstSchema);
        //return
        var jsonArray = [];
        var jsonObj = {};
        var userJsonArray = [];
        for(i=0;i<50;i++){
            var json = {};
            var userJson = {};
            for(key in firstSchema){
                if(firstSchema[key][Object.keys(firstSchema[key])[i]]&&firstSchema[key][Object.keys(firstSchema[key])[i]]['comment']){
                    var comment = firstSchema[key][Object.keys(firstSchema[key])[i]]['comment'];
                }
                if(firstSchema[key][Object.keys(firstSchema[key])[i]]&&firstSchema[key][Object.keys(firstSchema[key])[i]]['type']){
                    var type = firstSchema[key][Object.keys(firstSchema[key])[i]]['type'];
                }
                if(firstSchema[key][Object.keys(firstSchema[key])[i]]&&firstSchema[key][Object.keys(firstSchema[key])[i]]['className']){
                    var className = firstSchema[key][Object.keys(firstSchema[key])[i]]['className'];
                    //console.log(className);
                }
                if(Object.keys(firstSchema[key])[i] != undefined){
//                    json[key] ="参数: " +  Object.keys(firstSchema[key])[i] + " |注解: " + JSON.stringify(comment) + " |类型: " + JSON.stringify(type) + " |指向类: " + JSON.stringify(className);
//                    if(key == "ndGuestUser" | key == "ndShangHuUser" | key == "ndTalentUser"){
//                        userJson[key] = Object.keys(firstSchema[key])[i] + " | " + JSON.stringify(comment) + "| " + JSON.stringify(type);
//
//                    }
                    if(jsonObj[key] == null){
                        jsonObj[key] = {};
                    }
                    if(type == "String"){
                        if(Object.keys(firstSchema[key])[i] == 'objectId' | Object.keys(firstSchema[key])[i] == 'salt' | Object.keys(firstSchema[key])[i] == 'role' || Object.keys(firstSchema[key])[i] == 'updatedAt' | Object.keys(firstSchema[key])[i] == 'updatedAt'){

                        }else{
                            jsonObj[key][Object.keys(firstSchema[key])[i]] = "暂无数据";
                        }

                    }
                    if(type == "Date"){
                        if(Object.keys(firstSchema[key])[i] == 'updatedAt' | Object.keys(firstSchema[key])[i] == 'createdAt'){

                        }else{
                            jsonObj[key][Object.keys(firstSchema[key])[i]] = {
                                "__type": "Date",
                                "iso": "2016-07-19T09:19:18.806Z"
                            };
                        }
                    }
                    if(type == "File"){
                        jsonObj[key][Object.keys(firstSchema[key])[i]] = {
                            "__type": "Pointer",
                            "className": "_File",
                            "objectId": "57ed0dd80bd1d00058724ab6"
                        };
                    }
                    if(type == "Array"){
                        jsonObj[key][Object.keys(firstSchema[key])[i]] = [];
                    }
                    if(type == "Object"){
                        if(Object.keys(firstSchema[key])[i] == 'authData' | Object.keys(firstSchema[key])[i] == 'metaData'){

                        }else{
                            jsonObj[key][Object.keys(firstSchema[key])[i]] = {};
                        }
                    }
                    if(type == "Number"){
                        jsonObj[key][Object.keys(firstSchema[key])[i]] = 0;
                    }
                    if(type == "Boolean"){
                        jsonObj[key][Object.keys(firstSchema[key])[i]] = true;
                    }
                    if(type == "Pointer"){
                        //delete  jsonObj[key][Object.keys(firstSchema[key])[i]];
                    }
                    if(type == "Relation"){
                        //delete  jsonObj[key][Object.keys(firstSchema[key])[i]];
                    }
                }

                comment = "";
                type = "";
                className = "";
            }
            jsonArray.push(json);
            userJsonArray.push(userJson);
        }

        var json2xls = require('json2xls');
        log(jsonObj);
        jsonfile.writeFile("randomData.json",jsonObj , {spaces: 2}, function(err) {
            console.error(err)
        })
    } else {
        console.log(JSON.stringify(error));
        console.log(JSON.stringify(response));
    }
});
// json to excel;

