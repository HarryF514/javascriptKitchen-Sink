var AV = require('leanengine');
//AV.initialize("qIHr8eVejy878hTk3jBLzpC4-gzGzoHsz", "xEHOYUKDehIJ8h2HbHs1pTCg", "KJX9Mo2jgUiwXrRbLEVP3WyR");

var getAllItemsByClassName = {
    counter:0,
    resultsArray:[],
    run:function(className,callback){
        var self = this;
        var query = new AV.Query(className);
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
        })
    }
}



var leanextension = {
    getAllItemsByClassName:getAllItemsByClassName
}


module.exports = leanextension;
