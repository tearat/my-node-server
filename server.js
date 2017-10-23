var fs = require('fs');

fs.mkdirSync("test", function(err){
    if (err && err.code=="EEXIST")
    {
        console.log(err);
    }
    else
    {
        console.log("folder create");
    }
});

fs.renameSync("test","test2", function(e){
    if (e) { console.log('error rename'); }
    else { console.log("renamed"); }
});

fs.rmdirSync("test2", function(e){
    if (e) { console.log("error") }
    else { console.log("Papka was deleted") }
});