var http = require('http');
var clear = require('clear');

var app = require('./app');

http.createServer(app.handleRequest).listen(8000);
clear();
console.log("listen on localhost:8000");
console.log();