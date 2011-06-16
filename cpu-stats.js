var util = require('util'),
    exec = require('child_process').exec,
    child;

var c  = exec('sar -u 1 1 | grep Average');

c.stdout.on('data',function(data){
	var avg = data.split('     ');
	console.log('Average usr: '+avg[1]);
	console.log('Average nice: '+avg[2]);
	console.log('Average sys: '+avg[3]);
	console.log('Average idle: '+avg[4]);
});