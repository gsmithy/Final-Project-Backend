var express = require('express');
var router = express.Router();
var mysql = require('mysql2')


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'bethel123',
  database: 'GoodNews'
});

  connection.connect(function(err){
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Nice! You are connected to the DB!')
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* USER login. */

module.exports = router;