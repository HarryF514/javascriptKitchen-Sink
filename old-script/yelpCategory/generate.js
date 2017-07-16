function log(string){
    console.log(string);
}
var jsonfile = require('jsonfile');
var _ = require("underscore");
var file = 'categories.json'
var yelpCategories = jsonfile.readFileSync(file);

var restaurantCategories = _.filter(yelpCategories, function(num){
    return _.contains(num.parents, "restaurants");
});

var restaurantCategories = _.filter(restaurantCategories, function(num){

    return (num.country_whitelist == undefined)&&(num.country_blacklist == undefined);
});

var restaurantCategories = _.each(restaurantCategories, function(element,index,list){
    element['chineseTitle'] = "暂无";
});

log(restaurantCategories);

jsonfile.writeFile("restaurantCategories.json",restaurantCategories , {spaces: 2}, function(err) {
    console.error(err)
})