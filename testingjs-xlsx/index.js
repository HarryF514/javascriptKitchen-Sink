if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('excelData.xlsx');
var sheet_name_list = workbook.SheetNames;
console.log(sheet_name_list);
sheet_name_list.forEach(function(y) { /* iterate through sheets */
    var worksheet = workbook.Sheets[y];
    for (z in worksheet) {
        /* all keys that do not begin with "!" correspond to cell addresses */
        if(z[0] === '!') continue;
        console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
    }
});