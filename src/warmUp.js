/**
 * Created by jeffersonvivanco on 9/27/16.
 */
// warmUp.js
var net = require('net');
var Request = require('./miniWeb.js').Request;
var Response = require('./miniWeb.js').Response;
console.log(typeof Request);
// var Request = require('functions');
// Request object goes here... to parse out the path
// function Request(s){
//     var requestParts = s.split(' ');
//     var path = requestParts[1];
//     this.path = path;
// }


var server = net.createServer(function(sock) {
    // "routing" goes here...Let's do routing and serving content all in one shot
    console.log('connected', sock.remoteAddress, sock.remotePort);
    sock.on('data', function(binaryData) {
        var reqString = '' + binaryData;
        var req = new Request(reqString);
        var res = new Response(sock);
        if(req.path === '/') {
            sock.write('HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<h2>hello</h2>');
        } else  if(req.path === '/test') {
            sock.write('HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<h2>test</h2>');
            // req.sendFile('/public/html/test.html');
        }
        res.end();
    });
});
server.listen(8080, '127.0.0.1');
