/**
 * Created by jeffersonvivanco on 9/27/16.
 */
// fansite.js
// create your own fansite using your miniWeb framework

var App = require('./miniWeb.js').App;
var app = new App();

app.get('/', function (req, res) {
    res.sendFile('/html/home.html');
});
app.get('/home', function (req, res) {
    res.redirect(301,'/');
    res.end();
});
app.get('/home/', function (req, res) {
    res.redirect(301,'/');
    res.end();
});
app.get('/css/base.css', function (req, res) {
    // res.setHeader('Content-Type', 'text/css');
    res.sendFile('/css/base.css');
});

app.get('/fonts/Digital_tech.otf', function (req, res) {
    res.sendFile('/fonts/Digital_tech.otf');
});

app.get('/random', function (req, res) {
    res.sendFile('/html/randomHtml.html');
});
app.get('/random/', function (req, res) {
    res.redirect(301, '/random');
    res.end();

});
app.get('/randomWallePic', function (req, res) {

    var random = Math.floor(Math.random()*3 +1);
    if(random === 0){
        res.sendFile('/img/walle1.gif');
    }
    if(random === 1){
        res.sendFile('/img/walle2.gif');
    }
    if(random === 2){
        res.sendFile('/img/walle3.gif');
    }
    if(random === 3){
        res.sendFile('/img/walle4.jpg');
    }

});
app.get('/img/wallepng1.png', function (req, res) {
   res.sendFile('/img/wallepng1.png');
});

app.get('/about',function (req, res) {
   res.sendFile('/html/about.html');
});
app.get('/about/', function (req, res) {
    res.redirect(301,'/about');
    res.end();
});

app.listen(8080, '127.0.0.1');