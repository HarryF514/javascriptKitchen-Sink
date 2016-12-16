var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var getArticle = require("./getArticle.js");

var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';

if (cluster.isMaster) {
    // Fork workers.
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    Object.keys(cluster.workers).forEach(function(id) {
        //console.log("I am running with ID : "+cluster.workers[id].process.pid);
//        k++;
//        console.log(k);

    });

    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
        cluster.fork();

    });
} else {
    var workerID = cluster.worker.id;
    //console.log("do sth " + JSON.stringify(workerID));
    if(workerID == 1){
        for(var k = 0; k <= 30;k++){
            getArticle({block:k})
        }
    }
    if(workerID == 2){
        for(var k = 31; k <= 60;k++){
            getArticle({block:k})
        }
    }
    if(workerID == 3){
        for(var k = 61; k<= 90;k++){
            getArticle({block:k})
        }
    }
    if(workerID == 4){
        var thecount = 0;
        setInterval(function(){
            var Article = Parse.Object.extend("Qurl");
            var query = new Parse.Query(Article);
            query.exists("qArticle");
            query.count().then(function(_count){
                //console.log("process article count is " + _count);
                console.log("processed articles", _count - thecount);
                thecount = _count;

            })
        },5000);

        var articleCount = 0;
        setInterval(function(){
            var Article = Parse.Object.extend("Article");
            var query = new Parse.Query(Article);
            query.count().then(function(_count){
                //console.log("process article count is " + _count);
                console.log("processed articles", _count - articleCount);
                thecount = _count;

            })
        },5000);
    }
    //Do further processing.

}

