var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';

var removeDuplicate = {
    identifier:"c",
    columna:"title",
    className:"Article",
    getNonCheckObj:function(){
        var Article = Parse.Object.extend(removeDuplicate.className);
        var query = new Parse.Query(Article);
        query.notEqualTo("isChecked", removeDuplicate.identifier);
        return query.first();
    },
    getObjByTitle:function(title){
        var Article = Parse.Object.extend(removeDuplicate.className);
        var query = new Parse.Query(Article);
        query.equalTo(removeDuplicate.columna, title);
        return query.find();
    },
    checkTitle:function(){
        removeDuplicate.getNonCheckObj().then(function(result){
            var title= result.get(removeDuplicate.columna);
            removeDuplicate.getObjByTitle(title).then(function(_result){
                console.log(_result.length);
                //console.log("deleting " + _result[0].get(removeDuplicate.columna));

                if(_result.length > 1){
                    console.log("deleting " + _result[0].get(removeDuplicate.columna));
                    var indexToRemove = 0;
                    var numberToRemove = 1;
                    _result.splice(indexToRemove, numberToRemove);
                    return  Parse.Object.destroyAll(_result);

                }else{
                    _result[0].set("isChecked",removeDuplicate.identifier);
                    return _result[0].save();
                }
            }).then(function(__result){
                removeDuplicate.checkTitle();
            });
        })
    }
}

removeDuplicate.checkTitle();