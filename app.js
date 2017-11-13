var url = require('url');
var fs = require('fs');

const routes = [
    "/", "/login", "/auth"
]

function renderHTML(path, response)
{
    var head = fs.readFileSync('./views/_head.html');
    var body = fs.readFileSync(path);
    var end = fs.readFileSync('./views/_end.html');
    var data = head+body+end;
    response.write(data);
    console.log((path.slice(1,-5)+' Successfully loaded'));
    response.end();
}

module.exports = 
{
    handleRequest: function(request, response)
    {
        response.writeHead(200, {'Content-type': 'text/html'});
        
        var path = url.parse(request.url).pathname;
        
        if ( path == "/" )
        {
            renderHTML('./views/index.html', response);
        }
        else if ( routes.indexOf(path) != -1 )
        {
            renderHTML('./views'+path+'.html', response);
        }
        else 
        {
            console.log("Route not exist (404)");
            response.writeHead(404);
            response.write('404');
            response.end();
        }
    }
};