var AV = require('leanengine');
AV.initialize("qIHr8eVejy878hTk3jBLzpC4-gzGzoHsz", "xEHOYUKDehIJ8h2HbHs1pTCg", "KJX9Mo2jgUiwXrRbLEVP3WyR");
var _ = require("underscore");
var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';

function debugLog(s){
    console.log(s);
}

var getAllItemsByClassName = {
    counter:0,
    resultsArray:[],
    run:function(className,callback){
        
        var self = this;
        var query = new Parse.Query(className);
        query.limit(1000);
        query.skip(1000*this.counter);
        query.find().then(function(results){
            if(results.length == 0){
                callback(self.resultsArray);
                return;
            }
            for(var i=0;i<results.length;i++){
                self.resultsArray.push(results[i]);
            }
            self.counter++;
            self.run(className,callback);
        },function(error){
            console.log(error);
        })
    }
}



var leanextension = {
    getAllItemsByClassName:getAllItemsByClassName
}

leanextension.getAllItemsByClassName.run("Article",function(result){
    var savingArray = [];
    _.each(result,function(element,index,list){
        var newElement = element.toJSON();
        delete newElement.objectId;
        savingArray.push(newElement);
    })
    
    
})

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
        var query = new AV.Query(recusiveSaveToLean.className);
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
            parseObj.save().then(function(){
                var newElement = parseObj.toJSON();
                delete newElement.objectId;
                if(recusiveSaveToLean.AVObjectArray.length < 50){
                    recusiveSaveToLean.counter++;
                    console.log(recusiveSaveToLean.counter);
                    var TestObject = AV.Object.extend(recusiveSaveToLean.className);
                    var testObject = new TestObject(newElement);
                    recusiveSaveToLean.AVObjectArray.push(testObject);
                    recusiveSaveToLean.save();
                    return;
                }else{
                    AV.Object.saveAll(recusiveSaveToLean.AVObjectArray).then(function(){
                        console.log("save artile " + recusiveSaveToLean.AVObjectArray.length)
                        recusiveSaveToLean.countLeft();
                        recusiveSaveToLean.AVObjectArray = [];
                        recusiveSaveToLean.counter = 0;
                        recusiveSaveToLean.save();
                    },function(error){
                        setTimeout(function() {
                            AV.Object.saveAll(recusiveSaveToLean.AVObjectArray);
                        }, 5000);
                        console.log(error);
                    })
                }
                debugLog("recusiveSaveToLean")
            });
            
        })
       
    }
}

recusiveSaveToLean.save();

module.exports = leanextension;
