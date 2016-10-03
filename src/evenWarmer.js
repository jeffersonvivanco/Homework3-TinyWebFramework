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
        if (host[1] && referer[1]) {
            this.headers = {
                Host: host[1],
                Referer: referer[1]
            }
        }
        else {
            this.headers = {
                Host: host[1]
            }
        }
        this.body = body;
        this.toString = function () {
            return s;
        };
    },
    Response : function (r) {
        this.statusCode = 0;
        this.body = '\r\n';

        this.headers = {};
        this.setHeader  = function(name, value){
            this.headers[name] = value;
        };
        this.write = function(data){
            r.write(data);
        };
        this.end = function(s){
          r.write(s);
          r.end();
        };
        this.send = function (statusCode, body) {
            var s = 'HTTP/1.1';
            this.statusCode = statusCode;
            this.body = body;
            s = s+statusCode+this.headers.name+this.headers.value+body;
            this.end(s);
            console.log(s);
        };
        this.writeHead = function (statusCode) {
            this.statusCode = statusCode;
            this.write();
        };
        this.redirect = function(statusCode, url){
          if(isNaN(statusCode)){
              this.statusCode = 301;
              this.headers.Location = statusCode;
          }
          else{
              this.statusCode = statusCode;
              this.headers.Location = url;
          }
          this.end(this.statusCode, this.headers.Location);
        };
        this.toString = function(){
            var descriptions = {
                '200' : 'OK',
                '404' : 'Not Found',
                '500' : 'Internal Server Error',
                '400' : 'Bad Request',
                '301' : 'Moved Permanently',
                '302' : 'Found',
                '303' : 'See Other'
            };
            var s  = 'HTTP/1.1';
            if(Object.keys(this.headers).length === 0){
                s = s + ' '+this.statusCode+' '+descriptions[this.statusCode]+'\r\n'+this.body;
            }
            else{
                var headerString = '';
                for(var v in this.headers){
                    headerString = headerString + v+': '+this.headers[v]+'\r\n';
                }
                if(this.body == '\r\n'){
                    this.body = '';
                }
                s = s + ' '+this.statusCode+' '+descriptions[this.statusCode]+'\r\n'+headerString+'\r\n'+this.body;
            }
            return s;
        }
    }

};


module.exports = functions;