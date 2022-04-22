const express = require('express');
const router = express.Router();
const auth = require('../services/auth');
const { Post } = require('../models');


/* GET returns all posts. */
router.get('/', async (req, res, next) => {
  Post.findAll()
    .then(postList => {
        res.json(postList);
    }); 
});

/* POST user create new post */
router.post('/', async (req, res, next) => {
//get token from the request

const header = req.header.authorization; //receives the token

if (!header) {
    res.status(403).send();
    return;
}

//splits string of token at the 'space' - separates Bearer and hash to get the hash.
const token = header.split('')[1];

// validate/verify - get the user from the token
const user = await auth.verifyUser(token);

if (!user) {
    res.status(403).send(); //not good/expired token
    return;
}

// create the post with the user id

    Post.create({
        user_name: req.body.user_name, //DB Scpecifies "user_name"
        description: req.body.description,
        location: req.body.location,
        UserId: user.id //foreign key??
    }).then(newPost => {
        res.json(newPost);
    }).catch(() => {
        res.status(400).send();
    });
});

/* PUT user updates a post */
router.put('/:id', (req, res, next) => {
    const postId = parseInt(req.params.id);
    
    if (!postId || postId <= 0) {
        res.status(400).send("Invalid ID");
        return;
    }

    // Get the user from jwt

    // Get the post already in the DB

    //Compare the cat's userid to the token user id

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

/* DELETE user deletes a post */
router.delete('/:id', (req, res, next) => {
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

/* GET user views a post by post ID */
router.get('/:id', (req, res, next) => {
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