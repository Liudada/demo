var shell = require('shelljs');
var a = [1];
for (var i=0;i<3;i++) {
	shell.exec("ls", {silent:true}, function (code, output) {
		console.log(output);
		a[0] = a[0] + 1;
		console.log(a[0]);
	});
}