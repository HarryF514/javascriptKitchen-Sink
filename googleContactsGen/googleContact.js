var fs = require('fs');
var sampleString = ",,,,,,,,,,,,,,,,,,,,,,,,,, My Contacts,,4162734114";
var resultSting = "";
var startIngNumber = 9999999;
var counter = 1;
var firstLine = "Name,Given Name,Additional Name,Family Name,Yomi Name,Given Name Yomi,Additional Name Yomi,Family Name Yomi,Name Prefix,Name Suffix,Initials,Nickname,Short Name,Maiden Name,Birthday,Gender,Location,Billing Information,Directory Server,Mileage,Occupation,Hobby,Sensitivity,Priority,Subject,Notes,Group Membership,Phone 1 - Type,Phone 1 - Value \n"
for(var i=5000*(counter - 1);i<5000*counter;i++){
    resultSting = resultSting + ",,,,,,,,,,,,,,,,,,,,,,,,,, My Contacts,,416" + startIngNumber + "\n";
    startIngNumber--;
}

//console.log(resultSting);

fs.writeFile("contacts.csv", firstLine + resultSting, function (err) {
    console.log(err);
})