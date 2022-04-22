const express = require('express');
const router = express.Router();
const mysql = require('mysql2')


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


module.exports = router;