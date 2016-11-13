var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express();

app.set('views', path.join(__dirname, 'views/'));
app.set('view engine', 'jade');

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(require('stylus').middleware({src: __dirname + '/public'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require(path.join(__dirname, 'routes/url')));

app.listen(80);

module.exports = app;
