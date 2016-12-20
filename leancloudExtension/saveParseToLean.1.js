var AV = require('leanengine');
// production
AV.initialize("qIHr8eVejy878hTk3jBLzpC4-gzGzoHsz", "xEHOYUKDehIJ8h2HbHs1pTCg", "KJX9Mo2jgUiwXrRbLEVP3WyR");
// development
//AV.initialize("Tl20696TFoBNh3HEAeENkx9J-gzGzoHsz", "UzxwYif7Nb6Q5BbO2tzkdxdQ", "0Ljt4ISnneBMLYafS5A8SCxF");

var _ = require("underscore");
var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';

function debugLog(s){
    console.log(s);
}


var recusiveSaveToLean = {
    counter:0,
    className:"ArticleParser",
    AVObjectArray:[],
    getUnSaveParseObj:function(){
        var query = new Parse.Query("Article");
        query.doesNotExist("savedToLean");
        return query.first();
    },
    checkTitle:function(title){
        var query = new AV.Query(recusiveSaveToLean.className);
        query.equalTo("title",title);
        debugLog("title is " + title);
        debugLog("query.equalTo");
        return query.find();
    },
    countLeft:function(){
        var query = new Parse.Query("Article");
        query.doesNotExist("savedToLean");
        query.count().then(function(_count){
            console.log("left " + _count);
        })
    },
    save:function(){
        debugLog("recusiveSaveToLean")
        recusiveSaveToLean.getUnSaveParseObj().then(function(parseObj){
            if(parseObj == undefined){
                AV.Object.saveAll(recusiveSaveToLean.AVObjectArray);
                console.log("finished");
                return;
            }
            debugLog("parse obj is  " + parseObj);
            parseObj.set("savedToLean",true);
            debugLog("parseObj")
            parseObj.save().then(function(_updatedParseObj){
                console.log(_updatedParseObj.get("title"));
                var newElement = parseObj.toJSON();
                delete newElement.objectId;
                if(recusiveSaveToLean.AVObjectArray.length < 100){
                    recusiveSaveToLean.counter++;

                    var TestObject = AV.Object.extend(recusiveSaveToLean.className);
                    console.log("newElement");
                    var testObject = new TestObject(newElement);
                    recusiveSaveToLean.AVObjectArray.push(testObject);
                    console.log(recusiveSaveToLean.counter);
                    recusiveSaveToLean.save();

                    return;
                }else{
                    recusiveSaveToLean.countLeft();
                    AV.Object.saveAll(recusiveSaveToLean.AVObjectArray).then(function(){
                        console.log("save artile " + recusiveSaveToLean.AVObjectArray.length)

                        recusiveSaveToLean.AVObjectArray = [];
                        recusiveSaveToLean.counter = 0;
                        recusiveSaveToLean.save();
                    },function(error){
                        setTimeout(function() {
                            AV.Object.saveAll(recusiveSaveToLean.AVObjectArray).then(function(){
                                console.log("saved after error");
                            });
                        }, 5000);
                        console.log(error);
                    })
                }
            },function(error){
                console.log(error);
            });
            
        })
       
    }
}

recusiveSaveToLean.save();
