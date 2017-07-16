var credentials = {
    clientId: 'nadouxingapp',     /* Client ID from the registered app */
    clientSecret: 'XXFEF6RKyv1vb2eu6dqN6w8bN7yil2rF9ACLHZkL0Vs='  /* Client Secret from the registered app */
}
var translator = require('bingtranslator');

//var jsonfile = require('jsonfile')
//var previousResult = jsonfile.readFileSync("../node-crawler/techcrunch.com.json");
var counter = 0;

var AV = require('leanengine');
AV.initialize("qIHr8eVejy878hTk3jBLzpC4-gzGzoHsz", "xEHOYUKDehIJ8h2HbHs1pTCg", "KJX9Mo2jgUiwXrRbLEVP3WyR");


function go(){
    getUnPublishContent().then(function(articl){
        if(articl == null){
            return;
        }
        translator.translate(credentials, articl.attributes.content, 'en', 'zh', function(err,chineseContent){
            chineseContent = chineseContent.replace(/\\"/g, '"').replace(/\\\/p>/g, '/p>');
            translator.translate(credentials, articl.attributes.title, 'en', 'zh', function(err,chineseTitle){
                articl.set("chineseTitle",chineseTitle);
                articl.set("domain","huoreport.com");
                articl.set("chineseContent",chineseContent);
                articl.save();
            });
        });
    });

}

function getUnPublishContent(){
    var query = new AV.Query('techcrunchNews');
    query.doesNotExist("chineseTitle");
    return query.first();
}

go();