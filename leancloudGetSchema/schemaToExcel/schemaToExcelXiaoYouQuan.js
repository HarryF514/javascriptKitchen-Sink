var request = require('request');
var md5 = require('md5');

var diff = require('deep-diff').diff;

var dbInfoA = {
    appName:"海校齐友iOSDev",
    appId:"OAsq3BaUejlty6HR5y6LtoOA-gzGzoHsz",
    appKey:"rY459mImPgBLwM4H78n3lbzI",
    masterKey:"plvu0fCSPGdW3KcsmzUpff5a"
};

function findDuplicatesWordInArray(userJsonArray){
    var str = JSON.stringify(userJsonArray);
    //console.log(str);
    function countWords(sentence) {
        var index = {},
            words = sentence
                .replace(/[.,?!;()"'-]/g, " ")
                .replace(/\s+/g, " ")
                .toLowerCase()
                .split(" ");

        words.forEach(function (word) {
            if (!(index.hasOwnProperty(word))) {
                index[word] = 0;
            }
            index[word]++;
        });

        return index;
    }
    var duplicatesWord = countWords(str);
    for(key in duplicatesWord){
        if(duplicatesWord[key] == 3){
            console.log(key + ":" + duplicatesWord[key]);
        }
    }

    for(key in duplicatesWord){
        if(duplicatesWord[key] == 2){
            console.log(key + ":" + duplicatesWord[key]);
        }
    }
}

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
        //console.log(firstSchema);
       // return;
        //console.log(firstSchema.ndGuestUser);
        //console.log(Object.keys(firstSchema.ndGuestUser)[1]);
        //console.log(Object.keys(firstSchema.ndGuestUser)[1] + " | " + JSON.stringify(firstSchema.ndGuestUser[Object.keys(firstSchema.ndGuestUser)[1]]['comment']) + "| " + JSON.stringify(firstSchema.ndGuestUser[Object.keys(firstSchema.ndGuestUser)[1]]['type']));
        var jsonArray = [];
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
                    console.log(className);
                }
                if(Object.keys(firstSchema[key])[i] != undefined){
                    json[key] ="参数: " +  Object.keys(firstSchema[key])[i] + " |注解: " + JSON.stringify(comment) + " |类型: " + JSON.stringify(type) + " |指向类: " + JSON.stringify(className);
                    if(key == "ndGuestUser" | key == "ndShangHuUser" | key == "ndTalentUser"){
                        userJson[key] = Object.keys(firstSchema[key])[i] + " | " + JSON.stringify(comment) + "| " + JSON.stringify(type);

                    }
                }
                comment = "";
                type = "";
                className = "";
            }
            jsonArray.push(json);
            userJsonArray.push(userJson);
        }
        //console.log(jsonArray);
        //findDuplicatesWordInArray(userJsonArray);
        //return;
        var json2xls = require('json2xls');
        var fs = require('fs');
        var xls = json2xls(jsonArray);

        fs.writeFileSync('data1.xlsx', xls, 'binary');
    } else {
        console.log(JSON.stringify(error));
        console.log(JSON.stringify(response));
    }
});
// json to excel;

