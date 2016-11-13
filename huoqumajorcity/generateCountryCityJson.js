function log(string) {
    console.log(string);
}

var AV = require('leanengine');
AV.initialize(APP_ID, APP_KEY, MASTER_KEY);

var jsonfile = require('jsonfile');
var _ = require("underscore");
var file = 'cities.json';
//var wmc = jsonfile.readFileSync(file);
var worldMajorCity = jsonfile.readFileSync(file);

function findNested(obj, key, memo) {
    var i,
        proto = Object.prototype,
        ts = proto.toString,
        hasOwn = proto.hasOwnProperty.bind(obj);

    if ('[object Array]' !== ts.call(memo)) memo = [];

    for (i in obj) {
        if (hasOwn(i)) {
            if (i === key) {
                memo.push(obj[i]);
            } else if ('[object Array]' === ts.call(obj[i]) || '[object Object]' === ts.call(obj[i])) {
                findNested(obj[i], key, memo);
            }
        }
    }

    return memo;
}
var countryarray = [];
_.each(worldMajorCity, function (value, key, list) {

    var countryString = worldMajorCity[key]["n"];
    var cityArray = findNested(worldMajorCity[key], "n");
    var cityArray = _.filter(cityArray, function (num) {
        return num != "";
    });
    var obj = {
        "country": countryString,
        "city": cityArray
    }
    //log(countryString);
    if (countryString != "") {
        countryarray.push(obj);
    }
});


jsonfile.writeFile("countryCityJson.json", countryarray, {spaces: 2}, function (err) {
    console.error(err)
})

//log(countryarray);

//var city = findNested(worldMajorCity,"n");
//var city = _.reject(city, function(num){ return num == ""; });
//var city = _.reject(city, function(num){ return _.contains(countryarray, num); });
//log(city.length);
//var city = _.uniq(city);
//log(city.length);

