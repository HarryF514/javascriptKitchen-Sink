//var tcpp = require('tcp-ping');
//
////tcpp.probe('npmjs.com', 80, function(err, available) {
////    console.log(available);
////});
//
//tcpp.ping({ address: 'www.baidu.com',attempts:3}, function(err, data) {
//    console.log(data);
//});



var ping = require('ping');
let geoip = require('geo-from-ip')
var _ = require("underscore");



ping.promise.probe("blog.csdn.net")
    .then(function (res) {
        //console.log(res);
        //console.log(res.output.split("(")[1].split(")")[0]);
        var ipaddress = res.output.split("(")[1].split(")")[0];
        var ipinfoObj = geoip.allData(ipaddress);

        var findobj = _.extend(res, ipinfoObj);
        console.log(findobj);
    });

