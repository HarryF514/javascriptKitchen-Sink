/*
 * @Author: harryfeng
 * @Date:   2017-10-02 12:42:09
 * @Last Modified by:   harryfeng
 * @Last Modified time: 2017-10-02 12:50:50
 */

var exec = require('child_process').exec;
var cmd = 'curl -H \'User-Agent: Dalvik/1.6.0 (Linux; U; Android 4.3; Samsung Galaxy S4 - 4.3 - API 18 - 1080x1920 Build/JLS36G)\' -H \'Host: service.ycpai.com\' --data "platform=2&login_code=a7ff8f413bc5fce418adbc52d33aa926&user_id=326740&channel=&version=633&sort=1&page=2&role_type=0&industry=0&startup=0&age_range=0&state_id=0&city_id=0&" --compressed \'http://service.ycpai.com/project/find_project_partner\'';
var Datastore = require('nedb'),
    db = new Datastore({
        filename: 'nedb_partner.db',
        autoload: true
    });



function go() {

    db.count({}, function(err, count) {
        var page = Math.round(count / 10) + 1;
        console.log("page", page);
        var cmd = 'curl -H \'User-Agent: Dalvik/1.6.0 (Linux; U; Android 4.3; Samsung Galaxy S4 - 4.3 - API 18 - 1080x1920 Build/JLS36G)\' -H \'Host: service.ycpai.com\' --data "platform=2&login_code=a7ff8f413bc5fce418adbc52d33aa926&user_id=326740&channel=&version=633&sort=1&page=' + page + '&role_type=0&industry=0&startup=0&age_range=0&state_id=0&city_id=0&" --compressed \'http://service.ycpai.com/project/find_project_partner\'';
        exec(cmd, function(error, stdout, stderr) {
            console.log("stdout", JSON.parse(stdout));
            db.insert(JSON.parse(stdout).data, function(err, newDoc) {
                if (err) {
                    return console.log(err);
                } else {
                    setTimeout(function() {
                    	go();
                    }, 2000);
                }

            });
        });
    })
}

go();