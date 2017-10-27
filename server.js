var fs = require('fs');

//create("i will be renamed");
//create("i will be deleted");
//create("i will be live");
//rename("i will be renamed", "new name");
//remove("i will be deleted");

read(".");

function create(name)
{
    fs.mkdirSync(name, function(err){
        if (err && err.code=="EEXIST")
        { console.log(err); }
        else
        { console.log("folder create"); }
    });
}

function rename(name,newname)
{
    fs.renameSync(name,newname, function(err){
        if (err) { console.log('error rename'); }
        else { console.log("renamed"); }
    });
}

function remove(name)
{
    fs.rmdirSync(name, function(err){
        if (err) { console.log("error") }
        else { console.log("Papka was deleted") }
    });
}

function read(name)
{
    fs.readdir(name, (err,files)=>{
        files.forEach(file=>{
            console.log("- "+file);
        });
    });
}