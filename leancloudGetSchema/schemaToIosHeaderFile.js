var request = require('request');
var md5 = require('md5');
var fs = require('fs');
var diff = require('deep-diff').diff;

var dbInfoA = {
    appName:"纳豆行Development",
    appId:"WzJh5egSxHfgrzzku9O2imlV-gzGzoHsz",
    appKey:"jb9roobMGKupIo7DGWRAnvoq",
    masterKey:"IrPa4q9b5e6Rby0aL1yke4yn"
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
    var dataTypeMapping = {
        String:'NSString',
        Date : 'NSDate',
        Number : 'NSNumber',
        Array : 'NSArray',
        Object : 'NSDictionary',
        Boolean : 'NSNumber',
        File : 'AVFile'
    }
    if (!error && response.statusCode == 200) {
        var firstSchema = JSON.parse(body);
        //console.log(firstSchema);
        //return;
        var keysCounter = 0;
        function go(){
            var modelName = Object.keys(firstSchema)[keysCounter];
            if(modelName.indexOf('_') == 0){
                modelName = modelName.split('_')[1];
            }
            makeHeaderFile(modelName,function(){
                keysCounter++;
                if(Object.keys(firstSchema).length > keysCounter){
                    console.log(keysCounter);
                    setTimeout(function(){
                        go();
                    },200)
                }
            })
        };
        go();

        function makeHeaderFile(modelName,callback){
            //var modelName = 'User'
            fs.writeFile('headerFiles/' +  modelName+".m",'#import "'+modelName+'.h"' + '\n\n' + '@implementation '+modelName + '\n\n' + '@end');

            fs.writeFile('headerFiles/' +  modelName+".h", "#import <Foundation/Foundation.h>", function(err) {
                fs.appendFile('headerFiles/' + modelName+'.h', '\n\n@interface ' + modelName + ' : ' + 'NSObject', function (err) {
                    for(var thekey in firstSchema[modelName]){
                        var dataType = dataTypeMapping[firstSchema[modelName][thekey]['type']];
                        if(thekey == 'createdAt'){
                            var brief = '/*!' + '\n* @brief ' + '对象创建时间' + '\n*/';
                        }else if(thekey == 'objectId'){
                            var brief = '/*!' + '\n* @brief ' + '对象数据库id' + '\n*/';
                        }else if(thekey == 'updatedAt'){
                            var brief = '/*!' + '\n* @brief ' + '对象更新时间' + '\n*/';
                        }else if(firstSchema[modelName][thekey]['comment'] == undefined){
                            var brief = '/*!' + '\n* @brief ' + thekey + '\n*/';
                        }
                        else{
                            var brief = '/*!' + '\n* @brief ' + firstSchema[modelName][thekey]['comment'] + '\n*/';
                        }

                        if(dataType != undefined){
                            fs.appendFile('headerFiles/' + modelName+'.h', '\n' + brief + '\n' + '@property(nonatomic,copy)' + dataType + ' *' +thekey+';');
                        }else if(dataType == undefined && firstSchema[modelName][thekey]['type'] == 'Pointer'){
                            var dataType = firstSchema[modelName][thekey]['className'];
                            fs.appendFile('headerFiles/' + modelName+'.h', '\n' + brief + '\n' + '@property(nonatomic,copy)' + dataType + ' *' +thekey+';');
                        }
                    }
                    fs.appendFile('headerFiles/' + modelName+'.h', '\n\n' + '@end');
                })
            });
            if(callback){
                callback();
            }
        }


        return;
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



    } else {
        console.log(JSON.stringify(error));
        console.log(JSON.stringify(response));
    }
});
// json to excel;

