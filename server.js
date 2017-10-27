var fs = require('fs');
var format = require('node.date-time');

setInterval(function(){
    fs.appendFile("readme.log", new Date().format("Y-M-d H:M:S")+" "+"hahaha"+"\n");
},3000);