var AV = require('leanengine');
var _ = require("underscore");
AV.initialize("WzJh5egSxHfgrzzku9O2imlV-gzGzoHsz", "jb9roobMGKupIo7DGWRAnvoq", "IrPa4q9b5e6Rby0aL1yke4yn");

var baiduMap = require('baidumap');
var bdmap = baiduMap.create({
    'ak': 'ZwKlEM5ZpEcdIDUc3C1gI4kH'
});

function log(str) {
    console.log(str);
}

var geocoderOption = {'address': '中国东城', 'city': '东城'};
bdmap.geocoder(geocoderOption, function (err, reuslt) {

});

function getFirst(callback) {
    var query = new AV.Query('ndCity');
    query.doesNotExist("longitude");
    query.include("country");
    query.equalTo("country", AV.Object.createWithoutData("ndCountry", "5804f5a2bf22ec0064e9539a"));

    query.count().then(function (count) {
        console.log(count);
    }, function (error) {
    });

    query.first().then(function (data) {
        if (data == null) {
            log("finished");
            return;
        }
        var city = data.attributes.name;

        var country = data.attributes.country.attributes.name;
        log('trying  : ' + country + city);
        var geocoderOption = {'address': country + city, 'city': city};
        bdmap.geocoder(geocoderOption, function (err, result) {
            var resultobj = JSON.parse(result);
            log(JSON.parse(result));
            if (resultobj.status == 1) {
                data.set("latitude", 0);
                data.set("longitude", 0);
                data.save().then(function () {
                    log('success: ' + city);
                    if (callback) {
                        callback();
                    }
                }, function (error) {
                    log(error);
                });
                return;
            }
            var location = JSON.parse(result).result.location;
            data.set("latitude", location.lat);
            data.set("longitude", location.lng);
            data.save().then(function () {
                log('success: ' + city);
                if (callback) {
                    callback();
                }
            }, function (error) {
                log(error);
            });
        });
    }, function (error) {
    });
};

function go() {
    getFirst(function () {
        go();
    });
}

go();