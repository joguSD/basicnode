var express = require('express');
var bodyParser = require('body-parser');

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());
//serve static files (client, css, js, etc)
app.use(express.static(__dirname+ '/bower_components'));
app.use(express.static(__dirname+ '/client'));

//apply the routes
var words = require('./routes/words');
app.use('/api/words', words);

//start the app
var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Test app listening on http://%s:%s', host, port);
});
