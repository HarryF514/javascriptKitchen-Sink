const srtToObj = require('srt-to-obj');
const _ = require("underscore");
var freq = require('stringfreq')

var makeStringFromSubtitles = {
    counter:0,
    fileArray:["1.srt","friends.s01e02.720p.bluray.x264-psychd.srt","friends.s01e03.720p.bluray.x264-psychd.srt","friends.s01e04.720p.bluray.x264-psychd.srt","friends.s01e05.720p.bluray.x264-psychd.srt","friends.s01e06.720p.bluray.x264-psychd.srt","friends.s01e07.720p.bluray.x264-psychd.srt","friends.s01e08.720p.bluray.x264-psychd.srt","friends.s01e09.720p.bluray.x264-psychd.srt","friends.s01e10.720p.bluray.x264-psychd.srt","friends.s01e11.720p.bluray.x264-psychd.srt","friends.s01e12.720p.bluray.x264-psychd.srt","friends.s01e13.720p.bluray.x264-psychd.srt","friends.s01e14.720p.bluray.x264-psychd.srt","friends.s01e15.720p.bluray.x264-psychd.srt","friends.s01e16.720p.bluray.x264-psychd.srt","friends.s01e17.720p.bluray.x264-psychd.srt"],
    finalTextArray:[],
    makeString : function(callback){
        srtToObj(makeStringFromSubtitles.fileArray[makeStringFromSubtitles.counter]).then(srtData => {
            var onlyText = _.pluck(srtData, 'text');
            
            _.each(onlyText,function(element){
                element = element.replace(/[^\w\s]|_/g, "")
                    .replace(/\s+/g, " ").toLowerCase();
                makeStringFromSubtitles.finalTextArray.push(element);
            })
            if(makeStringFromSubtitles.counter < makeStringFromSubtitles.fileArray.length - 1){
                makeStringFromSubtitles.counter++;
                makeStringFromSubtitles.makeString(callback);
                
                
            }else{
                if(callback){
                    callback();
                }
            }
            

        });
    },
    countFrequency:function(stringArray){
        var freArray = freq(stringArray, ' ');
        _.each(freArray,function(element){
            console.log(element);
        })
    }
}

makeStringFromSubtitles.makeString(function(){
    
    makeStringFromSubtitles.countFrequency(makeStringFromSubtitles.finalTextArray);
})