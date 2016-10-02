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
        var host = requestParts[1].split(' ');
        var referer = requestParts[2].split(' ');
        var body = requestParts[3];

        this.method = method;
        this.path = path;
        if(host[1] && referer[1]){
            this.headers = {
                Host: host[1],
                Referer : referer[1]
            }
        }
        else{
            this.headers = {
                Host:host[1]
            }
        }
        this.body = body;
        this.toString = function () {
            return s;
        };


    }
};

module.exports = functions;