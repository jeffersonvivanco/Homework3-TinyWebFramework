/**
 * Created by jeffersonvivanco on 9/27/16.
 */
// miniWeb.js
// define your Request, Response and App objects here

function Request(s) {
    var requestParts = s.split('\r\n');
    var requestLine = requestParts[0].split(' ');
    var method = requestLine[0];
    var path = requestLine[1];
    var header1  = requestParts[1].split(' ');
    var header2 = requestParts[2].split(' ');
    var body = requestParts[3];
    var headers = function(header1, header2){
        var host = header1[1];
        var referer = header2[1];
        this.Host = host;
        this.Referer = referer;

    };
    this.method = method;
    this.path = path;
    this.headers = headers;
};


var s = '';
s += 'GET /foo.html HTTP/1.1\r\n';   // request line
s += 'Host: localhost:8080\r\n';     // headers
s += 'Referer: http://bar.baz/qux.html\r\n';
s += '\r\n';
var req = new Request(s);
console.log(s);

module.exports = new Request;