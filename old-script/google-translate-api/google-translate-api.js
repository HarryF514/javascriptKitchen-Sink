var googleTranslate = require("google-translate");
var result = googleTranslate("Hello world", {to: "de"});
console.log(result); // Hallo Welt