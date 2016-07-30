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
var workbook = XLSX.readFile('http://ac-oasq3bau.clouddn.com/e6d22909123e97e3.xlsx');
var sheet_name_list = workbook.SheetNames;
//console.log(sheet_name_list[0]);
AV.initialize("OAsq3BaUejlty6HR5y6LtoOA-gzGzoHsz", "rY459mImPgBLwM4H78n3lbzI");

sheet_name_list.forEach(function(y) { /* iterate through sheets */
    var worksheet = workbook.Sheets[y];
    var workSheetJsonArray = XLSX.utils.sheet_to_json(worksheet);

    saveAllSchool(workSheetJsonArray,function(){
        console.log('save school succeed');
        saveAllFaculty(workSheetJsonArray,function(){
            console.log('save faculty succeed');
            saveAllProgram(workSheetJsonArray,function(){
                console.log('save program succeed');
                saveAllClass(workSheetJsonArray,function(){

                });
            });
        });
    });
});

function saveAllSchool(workSheetJsonArray,callback){
    var schoolArray = getUniqueField(workSheetJsonArray,"最新高校名称");
    if(schoolArray.length > 1){
        //console.log('has more than one school');
        //return;
    }
    var schoolArrayObj = _.map(schoolArray, function(num){ return {
        name:num,
        author:AV.Object.createWithoutData('_User', '5781db5ed342d30057ce9aab')
    };
    });
    var avarray = makeAVObject(schoolArrayObj,'xyqSchool');
    AV.Object.saveAll(avarray).then(function (avobjs) {
        //console.log(avobjs);
        var kvpair = makeKeyValuePair(avobjs);
        _.each(workSheetJsonArray,function(element,index,list){
            var schoolIdObj = {
                schoolId:kvpair[element['最新高校名称']]
            }
            _.extend(element,schoolIdObj);
        });

        if(callback){
            callback();
        }

    }, function (error) {
        console.log(error);
    });
}

function saveAllFaculty(workSheetJsonArray,callback){
    var uniquefacultyArray = _.uniq(workSheetJsonArray, function(x){
        return x['学院'];
    });;

    var facultySaveAllArray = _.map(uniquefacultyArray, function(num){ return {
        name:num['学院'],
        school:AV.Object.createWithoutData('xyqSchool', num['schoolId']),
        author:AV.Object.createWithoutData('_User', '5781db5ed342d30057ce9aab')
    };
    });

    var facultySavingAllArray = makeAVObject(facultySaveAllArray,'xyqFaculty');
    AV.Object.saveAll(facultySavingAllArray).then(function (avobjs){
        var facultyKvpair = makeKeyValuePair(avobjs);
        _.each(workSheetJsonArray,function(element,index,list){
            var facultyIdObj = {
                facultyId:facultyKvpair[element['学院']]
            }
            _.extend(element,facultyIdObj);
        });
        if(callback){
            callback();
        }
    });
}

function saveAllProgram(workSheetJsonArray,callback){
    var uniqueProgramArray = _.uniq(workSheetJsonArray, function(x){
        return x['学院']+x['专业'];
    });

    var ProgramSaveAllArray = _.map(uniqueProgramArray, function(num){ return {
        name:num['专业'],
        school:AV.Object.createWithoutData('xyqSchool', num['schoolId']),
        faculty:AV.Object.createWithoutData('xyqFaculty', num['facultyId']),
        author:AV.Object.createWithoutData('_User', '5781db5ed342d30057ce9aab')
    };
    });

    var ProgramSavingAllArray = makeAVObject(ProgramSaveAllArray,'xyqProgram');
    AV.Object.saveAll(ProgramSavingAllArray).then(function (avobjs){
        var ProgramKvpair = makeKeyValuePair(avobjs);
        _.each(workSheetJsonArray,function(element,index,list){
            var ProgramIdObj = {
                programId:ProgramKvpair[element['专业']]
            }
            _.extend(element,ProgramIdObj);
        });
        if(callback){
            callback();
        }
    });
}

function saveAllClass(workSheetJsonArray,callback){
    var uniqueClassArray = _.uniq(workSheetJsonArray, function(x){
        return x['学院']+x['班级'];
    });

    var ClassSaveAllArray = _.map(uniqueClassArray, function(num){ return {
        name:num['班级'],
        school:AV.Object.createWithoutData('xyqSchool', num['schoolId']),
        faculty:AV.Object.createWithoutData('xyqFaculty', num['facultyId']),
        program:AV.Object.createWithoutData('xyqProgram', num['programId']),
        author:AV.Object.createWithoutData('_User', '5781db5ed342d30057ce9aab')
    };
    });

    var ClassSavingAllArray = makeAVObject(ClassSaveAllArray,'xyqClass');
    AV.Object.saveAll(ClassSavingAllArray).then(function (avobjs){
        var ClassKvpair = makeKeyValuePair(avobjs);
        _.each(workSheetJsonArray,function(element,index,list){
            var ClassIdObj = {
                ClassId:ClassKvpair[element['班级']]
            }
            _.extend(element,ClassIdObj);
        });
        if(callback){
            callback();
        }
        console.log(workSheetJsonArray);
    },function(error){
        console.log(error);
    });
}

function makeAVObject(SchoolNameArray,className){
    var avObjArray = [];
    _.each(SchoolNameArray,function(element,index,list){
        var TodoFolder = AV.Object.extend(className);
        var todoFolder = new TodoFolder(element);
//        todoFolder.set('name',element.name);
//        todoFolder.set('author',AV.Object.createWithoutData('_User', '5781db5ed342d30057ce9aab'));
        avObjArray.push(todoFolder);
    });
    return avObjArray;
}

function makeKeyValuePair(AvobjectArray){
    var kv = {};
    _.each(AvobjectArray,function(element,index,list){
        kv[element.attributes.name] = element.id;
    });
    return kv;
}


function getUniqueField(thejson,key){
    var schoolName = _.pluck(thejson, key);
    var uniqueSchoolName = _.uniq(schoolName);
    return uniqueSchoolName;
}
