var words = {
    nonDomainKeyWords:["comment","json","sina","baidu","redirect"],
    goodWords:["article","details"],
    hasNonDomainKeyWords:function(str){
        if (new RegExp(words.nonDomainKeyWords.join("|")).test(str)) {
            // At least one match
            return true;
        }else{
            return false;
        }
    },
    hasGoodWords:function(str){
        if (new RegExp(words.goodWords.join("|")).test(str)) {
            // At least one match
            return true;
        }else{
            return false;
        }
    }
}

//console.log(words.hasNonDomainKeyWords("this is a comsment"));

module.exports = words;
