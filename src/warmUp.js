/**
 * Created by jeffersonvivanco on 9/27/16.
 */
// warmUp.js


var net = require('net');
var server = net.createServer(function(sock){
    sock.write("HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n<em>Hello</em> <strong>World</strong>");
    sock.end();
});

server.listen(8080, '127.0.0.1');