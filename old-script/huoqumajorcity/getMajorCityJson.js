function log(string){
    console.log(string);
}
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
_.each(worldMajorCity, function(value,key,list){
    var country = worldMajorCity[key]["n"];
    log(country);
    if(country != ""){
        countryarray.push(country);
    }

});

//log(countryarray);

var city = findNested(worldMajorCity,"n");
var city = _.reject(city, function(num){ return num == ""; });
var city = _.reject(city, function(num){ return _.contains(countryarray, num); });
log(city.length);
var city = _.uniq(city);
log(city.length);
jsonfile.writeFile("originalCityFile.json",worldMajorCity , {spaces: 2}, function(err) {
    console.error(err)
})

jsonfile.writeFile("worldmajorcity.json",city , {spaces: 2}, function(err) {
    console.error(err)
})

jsonfile.writeFile("country.json",countryarray , {spaces: 2}, function(err) {
    console.error(err)
})
