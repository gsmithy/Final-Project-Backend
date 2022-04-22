const express = require('express');
const router = express.Router();
const { Post } = require('../models');


/* GET returns all posts. */
router.get('/', (req, res, next) => {
  Post.findAll()
    .then(postList => {
        res.json(postList);
    }); 
});

/* POST user create new post */
router.post('/', (req, res, next) => {
    Post.create({
        user_name: req.body.user_name, //DB Scpecifies "user_name"
        description: req.body.description,
        location: req.body.location
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