var express = require('express');
var router = express.Router();
const { Post } = require('../models');
//var auth = require('../services/auth');

/* GET returns all posts. */
router.get('/', function(req, res, next) {
  Post.findAll()
    .then(postList => {
        res.json(postList);
    }) 
});

//Post create a post
router.post('/', async function(req, res, next) {
    // Get token from request
    const header = req.headers.authorization;
    if (!header) {
        res.status(403).send();
        return;
    }

    const token = header.split('')[1];
    //Validate token/Get the user
    const user = await auth.verifyUser(token);

    if (!user) {
        res.status(403).send();
        return;
    }
    // Create the post wit the user id

    Post.create({
        user_name: req.body.user_name, //DB Scpecifies "user_name"
        description: req.body.description,
        location: req.body.location,
        UserId: user.UserId
    }).then(newPost => {
        res.json(newPost);
    }).catch(() => {
        res.status(400).send();
    });
});

//This is a TEST COMMIT

//Put update a post
router.put('/:id', function(req, res, next) {
    const postId = parseInt(req.params.id);
    
    if (!postId || postId <= 0) {
        res.status(400).send("Invalid ID");
        return;
    }

    Post.update({
        user_name: req.body.user_name, //DB Scpecifies "user_name"
        description: req.body.description,
        location: req.body.location
    }, {
        where: {
            id: postId
        }
    }).then(() => {
        res.status(204).send();
    }).catch(() => {
        res.status(400).send();
    })
});

//Delete
router.delete('/:id', function(req, res, next) {
    const postId = parseInt(req.params.id);
    
    if (!postId || postId <= 0) {
        res.status(400).send("Invalid ID");
        return;
    }

    Post.destroy({
        where: {
            id: postId
        }
    }).then(() => {
        res.status(204).send();
    }).catch(() => {
        res.status(400).send();
    })
});

//Get individual post by id
router.get('/:id', function(req, res, next) {
    const postId = parseInt(req.params.id);
    Post.findOne({
        where: {
            id: postId
        }
    }).then(thePost => {
        if(thePost) {
            res.json(thePost)
        } else {
            res.status(404).send();
        } err => {
            res.status(500).send(err);
        }
    });
});

module.exports = router;
