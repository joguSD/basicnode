var pg = require('pg');
var express = require('express');
var randomWords = require('random-words');
var router = express.Router();

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/test';

//middleware for our router
router.use(function(req, res, next) {
  console.log("Words router:", req.method, req.url);
  next();
});

router.post('/', function(req, res) {
  //get the word text from the body
  var word = req.body['text'] ? req.body['text'] : randomWords();
  //get a postgres client from the pool
  pg.connect(connectionString, function(err, client, done) {

    //inserts a random word into the database
    var query = client.query("INSERT INTO items(text) values($1) RETURNING *", [word]);

    query.on('row', function(row) {
	word = row;
    });

    //end the query and return the results
    query.on('end', function() {
      client.end();
      return res.json(word);
    });

    if(err) {
      return res.json("Something went wrong...");
    }
  });
});

router.get('/', function(req, res) {
  //get a postgres client from the pool
  pg.connect(connectionString, function(err, client, done) {
    var results = [];
    //query the results and scroll them 1 at atime
    var query = client.query("SELECT * FROM items ORDER BY id ASC");
    query.on('row', function(row) {
      results.push(row);
    });
    //end the query and return the results
    query.on('end', function() {
      client.end();
      return res.json(results);
    });

    if(err) {
      return res.json("Something went wrong...");
    }
  });
});

module.exports = router;
