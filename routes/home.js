const express = require('express');
const router = express.Router();
const { Post } = require('../models');

/* GET HOME PAGE - returns all posts. */
router.get('/home', async (req, res, next) => {
  
  Post.findAll()
    .then( postList => {
        res.status(200).send(postList);
    }).catch( err => {
        res.status(404).send(err);
    }) 
});

module.exports = router;