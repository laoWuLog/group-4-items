var fs = require('fs');

var bitmap=fs.readFileSync('./login.css');

var base64=new Buffer(bitmap).toString('base64');
console.log(base64);