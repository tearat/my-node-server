var fs = require('fs');
var url = require('url');
var path = require('path');

const routes = [
    "/", "/login", "/auth"
]

function renderHTML(path, response)
{
    console.log("Loading "+path+"...");
    response.writeHead(200, {'Content-type': 'text/html'});
    var head = fs.readFileSync('./views/_head.html');
    var body = fs.readFileSync(path);
    var end = fs.readFileSync('./views/_end.html');
    var data = head+body+end;
    response.write(data);
    console.log((path.slice(1)+' successfully loaded'));
    response.end();
    
    console.log();
}

function renderCSS(path,response)
{
    console.log("Loading "+path+"...");
    response.writeHead(200, { 'Content-Type': 'text/css' });
    var style = fs.readFileSync(path);
    response.write(style);
    console.log((path.slice(1)+' successfully loaded'));
    response.end();
    
    console.log();
}

function renderFavIcon(response)
{
    console.log("Loading favicon...");
    response.writeHead(200, { 'Content-Type': 'image/png' });
    var favicon = fs.readFileSync("./favicon.png");
    response.write(favicon);
    console.log('Favicon successfully loaded');
    response.end();
    
    console.log();
}

module.exports = 
{
    handleRequest: function(request, response)
    {
        console.log("=== Request sended ===");
        var mypath = url.parse(request.url).pathname;
        var extname = path.extname(mypath);
        
        // favicon
        if ( extname == ".ico" )
        {
            console.log("Favicon detected");
            renderFavIcon(response);
            console.log();
        }
        // CSS
        else if ( extname == ".css" )
        {
            console.log("CSS detected: "+mypath);
            renderCSS("."+mypath,response);
        }
        // HTML
        else
        {
            console.log("HTML detected: "+mypath);
            if ( mypath == "/" )
            {
                renderHTML('./views/index.html', response);
            }
            else if ( routes.indexOf(mypath) != -1 )
            {
                renderHTML('./views'+mypath+'.html', response);
            }
            else 
            {
                console.log(mypath);
                console.log("Route not exist (404)");
                response.writeHead(404);
                renderHTML('./views/404.html', response);
            }
        }
        // Здесь стоит заметить, что запросы к роуту и css должны происходить в разных процессах
        // потому что иначе будет write after end
        
    }
};