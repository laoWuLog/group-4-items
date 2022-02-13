var fs = require('fs');

var bitmap = fs.readFileSync('./login.css');

var base64 = new Buffer(bitmap).toString('base64');
console.log(base64);
//微信二维码样式转成base64格式，在页面用href调用