var fs = require("fs");

var bitmap = fs.readFileSync("./login.css");
// 转为base64格式的文件
var base64 = new Buffer(bitmap).toString("base64");
console.log(base64);
