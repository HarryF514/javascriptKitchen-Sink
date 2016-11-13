var AV = require('leanengine');
var _ = require("underscore");
AV.initialize("WzJh5egSxHfgrzzku9O2imlV-gzGzoHsz", "jb9roobMGKupIo7DGWRAnvoq", "IrPa4q9b5e6Rby0aL1yke4yn");
var jsonfile = require('jsonfile');


function log(str) {
    console.log(str);
}

var skip = 0;
var cityData = [];
function getFirst(callback) {
    var query = new AV.Query('ndCity');
    query.limit(1000);
    query.skip(skip);
    query.find().then(function (data) {
        if (data.length == 0) {
            log("finished");
            jsonfile.writeFile("cityCoordinatesJson.json", cityData, {spaces: 2}, function (err) {
                log("total save: " + cityData.length);
                console.error(err);
            })
            return;
        }
        skip = skip + data.length;

        _.each(data, function (element, index, list) {
            delete element.attributes.country;
        });
        var resultdata = _.pluck(data, "attributes");
        //log(resultdata);
        cityData = cityData.concat(resultdata);
        if (callback) {
            callback();
        }

    }, function (error) {
        log(error);
    });
};

function go() {
    getFirst(function () {
        go();
    });
}

go();