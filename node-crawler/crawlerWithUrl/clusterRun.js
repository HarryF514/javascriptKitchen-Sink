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
        getArticle({block:1})
        getArticle({block:2})
        getArticle({block:3})
    }
    if(workerID == 2){
        getArticle({block:4})
        getArticle({block:5})
        getArticle({block:6})
    }
    if(workerID == 3){
        getArticle({block:7})
        getArticle({block:8})
        getArticle({block:9})
    }
    if(workerID == 4){
        var thecount = 0;
        setInterval(function(){
            var Article = Parse.Object.extend("Qurl");
            var query = new Parse.Query(Article);
            query.exists("qArticle");
            query.count().then(function(_count){
                //console.log("process article count is " + _count);
                console.log(_count - thecount);
                thecount = _count;

            })
        },5000);
    }
    //Do further processing.

}

