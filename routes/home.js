const express = require('express');
const router = express.Router();
const { Post } = require('../models');

/* GET HOME PAGE - returns all posts. */
router.get('/home', async (req, res, next) => {
  
  Post.findAll({
    limit: 3,
    order: [ [ 'createdAt', 'DESC' ]]
  })
    .then( postList => {
        res.status(200).send(postList);
    }).catch( err => {
        res.status(404).send(err);
    }) 
});

router.get('/homelist', async (req, res, next) => {
  
    Post.findAll({
      limit: 10,
      order: [ [ 'createdAt', 'DESC' ]]
    })
      .then( postList => {
          res.status(200).send(postList);
      }).catch( err => {
          res.status(404).send(err);
      }) 
  });

module.exports = router;