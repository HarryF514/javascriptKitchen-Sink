/**
 * 1. pluck school and save school, add school id to every object in the array by using extend
 * 2. get unique faculty ,save faculty, create an object with factuly name as key and objectId as value,
 *    and add faculty id to object in array by matching faculty name
 * 3. get unique program , save program, creating prgram name + faculty name as key and objectId as value, and extend program id
 *    into the array
 * 4. get unique class, save class, creating class name + faculty ame as key and objectId as value, extend class id into
 *    the array;
 */
if(typeof require !== 'undefined') XLSX = require('xlsx');
var _ = require('underscore');
var AV = require('leanengine');
var workbook = XLSX.readFile('excelData.xlsx');
var sheet_name_list = workbook.SheetNames;
//console.log(sheet_name_list[0]);
AV.initialize("OAsq3BaUejlty6HR5y6LtoOA-gzGzoHsz", "rY459mImPgBLwM4H78n3lbzI");

sheet_name_list.forEach(function(y) { /* iterate through sheets */
    var worksheet = workbook.Sheets[y];
    var workSheetJsonArray = XLSX.utils.sheet_to_json(worksheet);
    var schoolArray = getUniqueField(worksheet,"最新高校名称");
    if(schoolArray.length > 1){
        console.log('has more than one school');
        return;
    }
    createAVObj({
        name:schoolArray[0],
        author:AV.Object.createWithoutData('_User', '5781db5ed342d30057ce9aab')
    },function(schoolObj){

    });
    return;
    var uniquePropertyArray = _.uniq(workSheetJsonArray, function(x){
        return x['学院']+x['专业'];
    });
    console.log(uniquePropertyArray);
    console.log(uniquePropertyArray.length);
    saveSchool(function(schoolId){

    });

    console.log(getUniqueField(worksheet,"专业"));
    console.log(getUniqueField(worksheet,"学院"));
    return;
    for (z in worksheet) {
        /* all keys that do not begin with "!" correspond to cell addresses */
        if(z[0] === '!') continue;
        //console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
    }
});


function makeKeyValuePair(){

}

function  checkExist(){

}

function createAVObj(obj,callback){
    var Todo = AV.Object.extend('xyqSchool');
    var todo = new Todo();
    todo.save(obj).then(function (todo) {
       if(callback){
           return callback(todo);
       }
    }, function (error) {
        console.log('createAVObj error message: ' + error.message);
    });
}

function getUniqueField(worksheet,key){
    var thejson = XLSX.utils.sheet_to_json(worksheet);
    var schoolName = _.pluck(thejson, key);
    var uniqueSchoolName = _.uniq(schoolName);
    return uniqueSchoolName;
}

function saveSchool(callback){
    if(callback){
        callback("5781dcf31532bc005f3ffe64");
    }
}