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
    save:function(){
        debugLog("recusiveSaveToLean")
        recusiveSaveToLean.getUnSaveParseObj().then(function(parseObj){
            if(parseObj == undefined){
                console.log("finished");
                return;
            }
            debugLog("parse obj is  " + parseObj);
            parseObj.set("savedToLean",true);
            debugLog("parseObj")
            parseObj.save().then(function(){
                var newElement = parseObj.toJSON();
                delete newElement.objectId;
                debugLog("recusiveSaveToLean")
                recusiveSaveToLean.checkTitle(newElement.title).then(function(count){
                if(count.length>0){
                    recusiveSaveToLean.save();
                }else{
                    var TestObject = AV.Object.extend(recusiveSaveToLean.className);
                    var testObject = new TestObject();
                    debugLog("testObject")
                    testObject.save(newElement).then(function(){
                        console.log("save title " + newElement.title);
                        recusiveSaveToLean.save();
                    },function(err){
                        debugLog("saved error recusiveSaveToLean.save();")
                        recusiveSaveToLean.save();
                        console.log(err)
                    });
                }
                    debugLog("aa recusiveSaveToLean.save();")
                    
                },function(err){
                    debugLog("setTimeout")
                    setTimeout(function(){
                        debugLog("error recusiveSaveToLean.save();")
                        recusiveSaveToLean.save();
                    },10000)
                    console.log(err)
                })
                
            });
            
        })
       
    }
}

recusiveSaveToLean.save();

module.exports = leanextension;
