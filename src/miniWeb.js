/**
 * Created by jeffersonvivanco on 9/27/16.
 */
// miniWeb.js
// define your Request, Response and App objects here




var functions = {

    App : function () {
        var net  = require('net');

        //-------------------------REQUEST OBJECT------------------------------------//
        this.Request = function (s) {
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
        };
        //------------------------------------------------------------------------//
        //-----------------------------RESPONSE OBJECT------------------------------------//
        this.Response = function (r) {
            this.r = r;
            this.statusCode = 0;
            this.body = '';

            this.headers = {};
            this.setHeader  = function(name, value){
                this.headers[name] = value;
            };
            this.write = function(data){
                r.write(data);
            };
            this.end = function(s){
                if(s != undefined)
                    r.write(s);
                r.end();
            };
            this.send = function (statusCode, body) {
                var s = 'HTTP/1.1';
                this.statusCode = statusCode;

                this.body = body;

                var str = this.toString();

                this.end(this.toString());
            };
            this.writeHead = function (statusCode) {
                this.statusCode = statusCode;
                // this.write(this.statusCode);
            };
            this.redirect = function(statusCode, url){
                if(isNaN(statusCode)){
                    this.statusCode = 301;
                    // this.headers['Location'] = statusCode;
                    this.setHeader("Location", statusCode);
                }
                else{
                    this.statusCode = statusCode;
                    // this.headers['Location'] = url;
                    this.setHeader("Location", url);
                }
                this.send(this.statusCode, this.body);
                // this.end();
            };

            this.sendFile = function(fileName){
                var fs  = require('fs');
                var path = require('path');
                this.callBack2 = function(contentType,err, data){

                    if(err){

                        this.writeHead(500);
                        this.end();
                    }
                    else{
                        this.writeHead(200);
                        this.setHeader('Content-Type', contentType);
                        this.write(data);
                        this.end();
                    }

                };

                var dirname = path.resolve('.')+'/public'+fileName;
                this.dirname = dirname;

                var extensions = {
                    'jpeg' : 'image/jpeg',
                    'jpg': 'image/jpeg',
                    'png' : 'image/png',
                    'gif' : 'image/gif',
                    'html' : 'text/html',
                    'css' : 'text/css',
                    'txt' : 'text/plain'
                };
                var extension = fileName.split('.');
                extension = extension[extension.length - 1];
                this.contentType = extensions[extension];

                if(extension === 'html' || extension === 'css' || extension === 'txt'){
                    fs.readFile(this.dirname,{encoding : 'utf8'},this.callBack2.bind(this,this.contentType));
                }
                else {
                    fs.readFile(this.dirname,{},this.callBack2.bind(this,this.contentType));
                }



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
                    s = s + ' '+this.statusCode+' '+descriptions[this.statusCode]+'\r\n\r\n'+this.body;
                }
                else{
                    var headerString = '';
                    for(var v in this.headers){
                        headerString = headerString + v+': '+this.headers[v]+'\r\n';
                    }
                    s = s + ' '+this.statusCode+' '+descriptions[this.statusCode]+'\r\n'+headerString+'\r\n'+this.body;
                }
                return s;
            }
        };
        //------------------------------------------------------------------------//
        //----------------------------APP OBJECT METHODS AND PROPERTIES------------------------------------//

        /*
        Methods
         */
        this.handleConnection  = function (sock) {
            sock.on('data', this.handleRequestData.bind(this,sock));
        };
        this.logResponse = function(req, res){
            var descriptions = {
                '200' : 'OK',
                '404' : 'Not Found',
                '500' : 'Internal Server Error',
                '400' : 'Bad Request',
                '301' : 'Moved Permanently',
                '302' : 'Found',
                '303' : 'See Other'
            };
            var shortMessage  = descriptions[res.statusCode];
            console.log(req.method + ' '+req.path+' - '+res.statusCode+' '+shortMessage);

        };
        this.handleRequestData = function (sock, binaryData) {
            this.data  = binaryData+"";
            var stringData  = this.data.split(' ');
            this.req = new this.Request(this.data);
            this.res = new this.Response(sock);
            if(stringData[0]!='HTTP/1.1'){
                this.res.statusCode = 400;
            }

            if(this.routes[this.req.path] !=undefined){
                this.routes[this.req.path](this.req, this.res);
            }
            else{
                this.res.statusCode = 404;
                this.res.send(404, "Uh oh! No page here!");
            }
            sock.on('close', this.logResponse.bind(this, this.req, this.res));


        };
        this.get = function (path, callback) {

            this.routes[path]  = callback;
        };
        this.listen  = function (port, host) {
            this.server.listen(port, host);
        };
        /*
         Properties
         */
        this.server = net.createServer(this.handleConnection.bind(this));
        this.routes = {};
    }

};


module.exports = functions;
