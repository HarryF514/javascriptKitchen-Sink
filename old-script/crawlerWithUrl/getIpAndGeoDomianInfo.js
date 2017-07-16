var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';

var ping = require('ping');
let geoip = require('geo-from-ip')
var _ = require("underscore");
var count = 0;
(function(){

    var Qurl = Parse.Object.extend("newDomain");
    var query = new Parse.Query(Qurl);
    //query.doesNotExist("country");
    query.each(function(_result){
        var url = _result.get("url");
        console.log(url);
        return ping.promise.probe(url)
            .then(function (res) {
                console.log(res);
                //console.log(res.output.split("(")[1].split(")")[0]);
                try{
                    var ipaddress = res.output.split("(")[1].split(")")[0];
                    var ipinfoObj = geoip.allData(ipaddress);

                    var findobj = _.extend(res, ipinfoObj);
                    count++;
                    console.log(count);
                    return _result.save(findobj)
                }catch (e){

                }

            });
    }).catch(function(error){
        console.log(error);
    });
})();


(function(){
//    setInterval(function(){
//        var aQurl = Parse.Object.extend("newDomain");
//        var countQuery = new Parse.Query(aQurl);
//        countQuery.doesNotExist("country");
//        countQuery.count().then(function(_count){
//            console.log(_count);
//        })
//    },2000);
})();
