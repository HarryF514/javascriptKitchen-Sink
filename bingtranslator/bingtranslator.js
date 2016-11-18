var credentials = {
    clientId: 'nadouxingapp',     /* Client ID from the registered app */
    clientSecret: 'XXFEF6RKyv1vb2eu6dqN6w8bN7yil2rF9ACLHZkL0Vs='  /* Client Secret from the registered app */
}
var translator = require('bingtranslator');

var jsonfile = require('jsonfile')
var previousResult = jsonfile.readFileSync("../node-crawler/techcrunch.com.json");
var counter = 0;

var AV = require('leanengine');
AV.initialize("qIHr8eVejy878hTk3jBLzpC4-gzGzoHsz", "xEHOYUKDehIJ8h2HbHs1pTCg", "KJX9Mo2jgUiwXrRbLEVP3WyR");

translator.detect(credentials, previousResult[counter].content, detectCb);

function detectCb(err, from) {
    if (err) {
        console.log('error', err);
        return;
    }


}

function translateCb(err, translated) {
    if (err) {
        console.log('error', err);
        return;
    }

    console.log(translated);
    counter++;
    makeAVOjbectArray(previousResult[counter].content,previousResult[counter].title,previousResult[counter].url,translated,function(){
        translator.detect(credentials, previousResult[counter].content, detectCb);
    });

}

function go(){
    translator.translate(credentials, previousResult[counter].content, 'en', 'zh', function(err,chineseContent){
        translator.translate(credentials, previousResult[counter].title, 'en', 'zh', function(err,chineseTitle){
            makeAVOjbectArray(previousResult[counter].content,previousResult[counter].title,previousResult[counter].url,chineseContent,chineseTitle,function(){
                counter++;
                console.log(counter);
                go();
            });
        });
    });
}

go();


function makeAVOjbectArray(content,title,url,chineseContent,chineseTitle,ck){
    var todoFolder = new AV.Object('techcrunchNews');
    todoFolder.set('content', content);
    todoFolder.set('title', title);
    todoFolder.set('chineseTitle', chineseTitle);
    todoFolder.set('url', url);
    todoFolder.set('chineseContent', chineseContent);
    todoFolder.save().then(function(){
        if(ck){
            ck();
        }
    },function(error){
        console.log(error);
    })
}