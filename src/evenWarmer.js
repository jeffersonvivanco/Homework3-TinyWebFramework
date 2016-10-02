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

        this.method = method;
        this.path = path;
        this.headers = {
            Host: header1[1],
            Referer : header2[1]
        }

}
};

module.exports = functions;