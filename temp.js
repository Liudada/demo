var shell = require('shelljs');
var util = require('util');
var commond = '"D:/C projects/opencvface/release/opencvface" --cascade="D:/C projects/opencvface/haarcascades/haarcascade_frontalface_alt.xml" --nested-cascade="D:/C projects/opencvface/haarcascades/haarcascade_eye.xml" --scale=1.25 --i="D:/C projects/opencvface/test1.jpg" --o="D:/C projects/opencvface/result1.jpg"';
var str = 'node nodefolder.js';
var version = shell.exec(commond, {silent:true}, function(code, output){
	console.log('123');
	console.log(output);
});
