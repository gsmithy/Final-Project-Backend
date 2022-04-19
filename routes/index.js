var express = require('express');
var router = express.Router();
const mysql = require('mysql')


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'bethel123',
  database: 'goodnews'
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

module.exports = router;
