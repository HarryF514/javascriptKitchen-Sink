var _ = require("underscore");

var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';
var domainList = require("./domainList");

Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
}

var showStat = {
    startingDate : new Date(),
    endDate:new Date(),
    latestDate:new Date(),
    getStartingDate:function(callback){
        var Article = Parse.Object.extend("Article");
        var query = new Parse.Query(Article);
        query.ascending("createdAt");
        query.first().then(function(_result){
            showStat.startingDate = _result.get("createdAt");
            showStat.endDate = new Date(showStat.startingDate);
            showStat.endDate.addHours(1);

            var Article = Parse.Object.extend("Article");
            var latestDateQuery = new Parse.Query(Article);
            latestDateQuery.descending("createdAt");
            latestDateQuery.first().then(function(__result){
                showStat.latestDate = __result.get("createdAt");
                if(callback){
                    callback();
                }
            })


        })
    },
    countBetweenDate:function(startDate,endDate){

        var query = new Parse.Query('Article');
        query.greaterThanOrEqualTo('createdAt', startDate);
        console.log("start date " + startDate);
        console.log("end date " + endDate);
        query.lessThan('createdAt', endDate);
        query.count().then(function(_count){
            console.log("count is " + _count);
            if(endDate <= showStat.latestDate){
                showStat.countBetweenDate(startDate.addHours(1),endDate.addHours(1));
            }


        })
    }
}

showStat.getStartingDate(function(){

    showStat.countBetweenDate(showStat.startingDate,showStat.endDate);
});