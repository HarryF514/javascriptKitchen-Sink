var AV = require('leanengine');
var _ = require("underscore");
AV.initialize("3B5q4r6AsrWoE1orGXR92nk3-gzGzoHsz", "v2TBzkoAUaz077HwOFDM7Hhc", "S2xfo2IGO4gF9zYObwzNNhDy");

var jsonfile = require('jsonfile');
var countryCityJson = jsonfile.readFileSync("countryCityJson.json");
console.log("国家数量：" + countryCityJson.length);
var leanCloudSavedCountry = [];
var leanCloudSavedCountryAvobjectArray = [];
var countryCounter = 0;


function savingCountry() {

    function saveCounry(callback) {
        var CountryObj = AV.Object.extend('ndCountry');
        // 新建一个 Todo 对象
        var country = new CountryObj();
        country.set('name', countryCityJson[countryCounter].country);
        country.save().then(function (_country) {
            // 成功保存之后，执行其他逻辑.
            console.log(_country.id + " saved " + _country.attributes.name);
            if (callback) {

                callback(_country)
            }

        }, function (error) {
            // 异常处理
            console.error('Failed to create new object, with error message: ' + error.message);
        });
    }

    function go() {
        if (countryCounter < countryCityJson.length) {
            //console.log(leanCloudSavedCountry);
            //console.log(countryCityJson[countryCounter].country);
            var countryexist = _.contains(leanCloudSavedCountry, countryCityJson[countryCounter].country);
            //console.log(countryexist);
            //console.log(countryCounter);
//    return;
//    console.log(countryCounter);
            if (countryexist) {
                countryCounter++
                go();
            } else {
                saveCounry(function () {
                    countryCounter++
                    go();
                })
            }
        } else {
            console.log("finished");
            //starSaveCityVersionOne()
            //saveCityBundle();

            var query = new AV.Query('ndCountry');
            query.limit(1000);
            query.find().then(function (_countryArray) {
                leanCloudSavedCountryAvobjectArray = _countryArray;
                leanCloudSavedCountry = _countryArray;
                leanCloudSavedCountry = _.pluck(_.pluck(leanCloudSavedCountry, 'attributes'), 'name');
                goSaveBuncleCity();

            }).then(function (todos) {
                // 更新成功
            }, function (error) {
                // 异常处理
            });


        }

    }

    function getAllCountry() {
        var query = new AV.Query('ndCountry');
        query.limit(1000);
        query.find().then(function (_countryArray) {
            leanCloudSavedCountryAvobjectArray = _countryArray;
            leanCloudSavedCountry = _countryArray;
            leanCloudSavedCountry = _.pluck(_.pluck(leanCloudSavedCountry, 'attributes'), 'name');
            //console.log(leanCloudSavedCountry);
            //return;
            go();

        }).then(function (todos) {
            // 更新成功
        }, function (error) {
            // 异常处理
        });
    }

    getAllCountry();
}

var query = new AV.Query('ndCity');
query.find().then(function (currentCities) {
    if (currentCities.length > 0) {
        console.log("如果需要更新城市，请清理原来所有国家和城市数据先");
    } else {
        savingCountry();
    }
}).then(function (todos) {
    // 更新成功
}, function (error) {
    // 异常处理
});


function starSaveCityVersionOne() {
    var cityCounter = 0;
    var cityCountryCounter = 0;

    function saveCity(callback) {


        if (cityCounter < countryCityJson[cityCountryCounter].city.length) {
            var theCountry = _.find(leanCloudSavedCountryAvobjectArray, function (num) {
                return num.attributes.name == countryCityJson[cityCountryCounter].country;
            });
            checkCity(countryCityJson[cityCountryCounter].city[cityCounter], function (returningCity) {
                if (returningCity != undefined) {
                    console.log("跳过： " + countryCityJson[cityCountryCounter].city[cityCounter]);
                    cityCounter++;
                    if (callback) {
                        callback();
                    }
                } else {
                    var CityObject = AV.Object.extend('ndCity');
                    var city = new CityObject();

                    city.set('name', countryCityJson[cityCountryCounter].city[cityCounter]);
                    city.set('country', theCountry);

                    city.save().then(function (_city) {
                        // 成功保存之后，执行其他逻辑.
                        console.log(_city.id + " saved " + _city.attributes.name);
                        cityCounter++;
                        if (callback) {
                            callback(_city)
                        }

                    }, function (error) {
                        // 异常处理
                        console.error('Failed to create new object, with error message: ' + error.message);
                    });
                }
            });
        } else {
            cityCountryCounter++;
            if (callback) {
                callback();
            }

        }


    }

    function checkCity(cityName, callback) {
        var query = new AV.Query('city');
        query.equalTo("name", cityName)
        query.first().then(function (_city) {
            if (callback) {
                callback(_city);
            }
        }).then(function (todos) {
            // 更新成功
        }, function (error) {
            // 异常处理
        });
    }


    function gosavecity() {

        saveCity(function () {
            gosavecity();
        })
    };
    gosavecity()
}

var cityCountryCounter = 0;
function saveCityBundle(callback) {

    var cityArrayBeforeSave = [];
    if (cityCountryCounter < countryCityJson.length) {
        var theCountry = _.find(leanCloudSavedCountryAvobjectArray, function (num) {
            return num.attributes.name == countryCityJson[cityCountryCounter].country;
        });

        _.each(countryCityJson[cityCountryCounter].city, function (city, index, list) {
            var individualCity = new AV.Object('ndCity');
            individualCity.set('name', city);
            individualCity.set('country', theCountry);
            cityArrayBeforeSave.push(individualCity);
        });

        AV.Object.saveAll(cityArrayBeforeSave).then(function (savedCity) {
            console.log("save city number: " + savedCity.length)
            cityCountryCounter++;
            if (callback) {
                callback();
            }
        }, function (error) {
        });
    } else {
        console.log("上传国家数量：" + cityCountryCounter);
        console.log("finished");
    }

}

function goSaveBuncleCity() {
    saveCityBundle(function () {
        goSaveBuncleCity();
    })
}

