var fs = require('fs');

fs.readFile("text.json", function(err,data){
    if (err) throw err;
    var arr = JSON.parse(data.toString());
    console.log(arr.name);
});

fs.readFile("stih.txt", function(err,data){
    if (err) throw err;
    var arr;
    arr = data.toString().trim();
    arr = arr.split("\r\n");
    console.log(arr[2]);
});

var arr;
arr = fs.readFileSync("text.txt").toString();

console.log(arr);