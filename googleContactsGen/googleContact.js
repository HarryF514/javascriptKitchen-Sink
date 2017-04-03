var fs = require('fs');
var sampleString = ",,,,,,,,,,,,,,,,,,,,,,,,,, My Contacts,,4162734114";
var resultSting = "";
var startIngNumber = 9999999;
var counter = 2;
var firstLine = "Name,Given Name,Additional Name,Family Name,Yomi Name,Given Name Yomi,Additional Name Yomi,Family Name Yomi,Name Prefix,Name Suffix,Initials,Nickname,Short Name,Maiden Name,Birthday,Gender,Location,Billing Information,Directory Server,Mileage,Occupation,Hobby,Sensitivity,Priority,Subject,Notes,Group Membership,Phone 1 - Type,Phone 1 - Value \n"
startIngNumber = startIngNumber - 20000;
//for(var i=0;i<10000;i++){
//    resultSting = resultSting + ",,,,,,,,,,,,,,,,,,,,,,,,,, My Contacts,,416" + startIngNumber + "\n";
//    startIngNumber--;
//}
//
////console.log(resultSting);
//
//fs.writeFile("contacts.csv", firstLine + resultSting, function (err) {
//    console.log(err);
//})

var contact = {
    counter:0,
    resultSting:"",
    startIngNumber:9999999,
    numberPerDocument:20000,
    gen:function(){
        //console.log(this.counter*this.numberPerDocument);
        this.startIngNumber = 9999999 - this.counter*this.numberPerDocument;
        console.log(this.startIngNumber);
        for(var i=0;i<this.numberPerDocument;i++){
            this.resultSting = this.resultSting + ",,,,,,,,,,,,,,,,,,,,,,,,,, My Contacts,,416" + this.startIngNumber + "\n";
            this.startIngNumber--;
        }
        fs.writeFile("contacts" + this.counter + ".csv", firstLine + this.resultSting, function (err) {
            if(err){
                console.log(err);
            }
            //console.log(contact.counter);
            if(contact.counter <= 10){
                //console.log(contact.counter);
                setTimeout(function(){
                    contact.resultSting = "";
                    contact.counter++
                    contact.gen();
                },500);

            }
        })
    }
}

contact.gen();