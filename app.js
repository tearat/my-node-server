var url = require('url');
var fs = require('fs');

function renderHTML(path, response)
{
    //head
    fs.readFile('./_head.html', null, function(error, data){
        response.write(data);
    });
    //file
    fs.readFile(path, null, function(error, data){
        response.write(data);
    });
    //end
    fs.readFile('./_end.html', null, function(error, data){
        response.write(data);
        console.log((path.slice(2,-5)+' Successfully loaded'))
        response.end();
    });
}

function renderHTML2(path, response)
{
    //head
    fs.readFile('./_head.html', null, function(error, data){
        response.write(data);
        //file
        fs.readFile(path, null, function(error, data){
            response.write(data);
            //end
            fs.readFile('./_end.html', null, function(error, data){
                response.write(data);
                console.log((path.slice(2,-5)+' Successfully loaded'));
                response.end();
            });
        });
    });
}

module.exports = 
{
    handleRequest: function(request, response)
    {
        response.writeHead(200, {'Content-type': 'text/html'});
        
        var path = url.parse(request.url).pathname;
        switch (path)
        {
            case '/':
                renderHTML2('./index.html', response);
                break;
            case '/login':
                renderHTML2('./login.html', response);
                break;
            default:
                response.writeHead(404);
                response.write('404');
                console.log("Route not defined");
                response.end();
        }
    }
};