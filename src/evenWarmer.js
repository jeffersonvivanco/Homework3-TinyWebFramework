/**
 * Created by jeffersonvivanco on 9/27/16.
 */
// evenWarmer.js
// create Request and Response constructors...




var functions = {

    Request : function (s) {
        var requestParts = s.split('\r\n');
        var requestLine = requestParts[0].split(' ');
        var method = requestLine[0];
        var path = requestLine[1];
        var header1 = requestParts[1].split(' ');
        var header2 = requestParts[2].split(' ');
        var body = requestParts[3];
        var headers = function () {
            return {
                Host : header1[1],
                Referer : header2[1]
            }

        };
        // return {
        //     method : this.method,
        //     path : this.path,
        //     headers : this.headers
        // };
        this.method = method;
        this.path = path;
        this.headers = {
            Host: header1[1],
            Referer : header2[1]
        }

}
};
// var s = '';
// s += 'GET /foo.html HTTP/1.1\r\n';   // request line
// s += 'Host: localhost:8080\r\n';     // headers
// s += 'Referer: http://bar.baz/qux.html\r\n';
// s += '\r\n';
// var req = new functions.Request(s);
// console.log(req);

module.exports = functions;