#! /usr/bin/env node
var fs = require("fs"),
    path = process.cwd();

fs.readdir(path, function(err, files){
    if(err){
        return console.log(err);
    }
    for(var i = 0; i < files.length; i += 1){
        console.log(files[i]);
    }
});