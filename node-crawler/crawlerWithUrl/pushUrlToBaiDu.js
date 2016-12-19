var AV = require('leanengine');
AV.initialize("qIHr8eVejy878hTk3jBLzpC4-gzGzoHsz", "xEHOYUKDehIJ8h2HbHs1pTCg", "KJX9Mo2jgUiwXrRbLEVP3WyR");
var _ = require("underscore");
var fs = require('fs');

var makeUrl = {
    counter:0,
    fullUrl:"",
    getObj :function(){
        var query = new AV.Query("ArticleParser");
        query.limit(1000);
        query.skip(1000*makeUrl.counter);
        query.find().then(function(_results){
            console.log(makeUrl.counter);
            if(_results.length == 0){
                console.log("finished");
                return;
            }
            makeUrl.fullUrl = "";
            _.each(_results,function(element,index,list){
                makeUrl.fullUrl = makeUrl.fullUrl + "http://www.huoreport.com/huanqiuNews/" + element.id + "\n";
            })
            if(makeUrl.counter == 0){
                fs.writeFile("urls.txt",makeUrl.fullUrl,function(err){
                    console.log(err);
                    makeUrl.counter++;
                    makeUrl.getObj();
                });
            }else{
                fs.appendFile("urls.txt",makeUrl.fullUrl,function(err){
                    console.log(err);
                    makeUrl.counter++;
                    makeUrl.getObj();
                });
            }

        })
    }
}

makeUrl.getObj();