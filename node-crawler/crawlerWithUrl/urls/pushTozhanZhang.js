var request = require('request');
var fs = require("fs");
var headers = {
    'Content-Type': 'text/plain'
};
var counter = 0;
var data = fs.readFileSync('urls' + counter + '.txt');

var dataString = data.toString();

var options = {
    url: 'http://data.zz.baidu.com/urls?site=www.huoreport.com&token=ZLuiR1BbWepJs2zP',
    method: 'POST',
    headers: headers,
    body: dataString
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {

        if(counter<86){
            console.log(counter);
            counter++;
            request(options, callback);
        }

    }
}

request(options, callback);


//console.log("同步读取: " + data.toString());