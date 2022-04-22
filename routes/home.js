const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const { Post } = require('../models');


router.get('/', (req, res, next) => {
  Post.findAll().then(postDisplay => {
      res.send(postDisplay);
  });
});

module.exports = router;