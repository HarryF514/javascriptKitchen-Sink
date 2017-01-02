var Parse = require('parse/node');
Parse.initialize("111");
Parse.serverURL = 'http://localhost:1337/parse';

var UrlUtil = {
    extractDomain: function (url) {
        var domain;
        //find & remove protocol (http, ftp, etc.) and get domain
        if (url.indexOf("://") > -1) {
            domain = url.split('/')[2];
        }
        else {
            domain = url.split('/')[0];
        }

        //find & remove port number
        domain = domain.split(':')[0];

        if (domain.split('.').length == 4) {
            domain = domain.split('.')[1] + "." + domain.split('.')[2] + "." + domain.split('.')[3];
        }

        return domain;
    },
    saveNewDomain: function (url) {
        var Qurl = Parse.Object.extend("newDomain");
        var query = new Parse.Query(Qurl);
        query.equalTo("url", url);
        query.find().then(function (_results) {
            if (_results.length == 0) {
                //console.log("start to save new domain");
                var TestObject = Parse.Object.extend("newDomain");
                var testObject = new TestObject();
                return testObject.save({url: url});
            }
        }).catch(function (error) {
            console.log(error);
        })
    },
    checkUrl: function (url) {
        var Qurl = Parse.Object.extend("Qurl");
        var query = new Parse.Query(Qurl);
        query.equalTo("url", url);
        return query.find();
    },
    saveUrl: function (url) {
        UrlUtil.checkUrl(url).then(function (_results) {
            if (_results.length == 0) {
                var TestObject = Parse.Object.extend("Qurl");
                var testObject = new TestObject();
                return testObject.save({url: url});
            }
        }).catch(function (error) {
            console.log(error);
        })
    },
    getUnQueueUrl: function () {
        var Qurl = Parse.Object.extend("Qurl");
        var query = new Parse.Query(Qurl);
        query.doesNotExist("queue");
        query.contains("url", domain);
        return query.first();
    }
}

module.exports = UrlUtil;