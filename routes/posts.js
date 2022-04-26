const express = require('express');
const router = express.Router();
const { Post } = require('../models');



/* GET HOME PAGE - returns all posts. */

router.get('/', async (req, res, next) => {
  Post.findAll()
    .then( postList => {
        res.json(postList);
    }); 
});

/* GET DASHBOARD POSTS - User sees all his posts */
router.get('/:username', async (req, res, next) => {
    const whosePosts = req.params.username;
    
    const user = req.user;
        if (!user){
            res.status(403).send('Please log in!');
            return;
        };

    Post.findAll({
        where: {
            user_name: whosePosts
        }
    }).then( result => {
        if (result){
            res.status(200).send(result);
        } else {
            res.status(400).send('Oops! Something went wrong!')
        }
    })
});

/* POST CREATE POSTS - User creates a new post */

router.post('/', async (req, res, next) => {
    const user = req.user;
    if (!user){
        res.status(403).send('Please log in!');
        return;
    };
        //if (token === )
    Post.create({

        user_name: req.body.user_name, 
        description: req.body.description,
        location: req.body.location,
        UserId: user.id 

    }).then(newPost => {
        res.json({
            user_name: newPost.user_name,
            location: newPost.location,
            description: newPost.description,
            createdAt: newPost.createdAt //TIMESTAMP
        });
    }).catch(() => {
        res.status(400).send();
    });
});

/* PUT UPDATE POST - User updates a post */

router.put('/:id', async (req, res, next) => {
    const postId = parseInt(req.params.id);
    
    if (!postId || postId <= 0) {
        res.status(400).send("Invalid ID");
        return;
    };
    const user = req.user;
    if (!user){
        res.status(403).send('Please log in!');
        return;
    };
    //Compare the post's userid to the token user id
    Post.update({

        description: req.body.description,
        location: req.body.location

    }, {
        where: {
            id: postId
        }
    }).then( () => {
        res.status(200).send('Update success!');
    }).catch(() => {
        res.status(400).send();
    })
});

/* DELETE DELETE POST - User deletes a post */

router.delete('/:id', (req, res, next) => {
    const postId = parseInt(req.params.id);

        if (!postId || postId <= 0) {
            res.status(400).send("Invalid id!");
            return;
    };
    const user = req.user;
    if (!user){
        res.status(403).send('Please log in!');
        return;
    };

    Post.destroy({
        where: {
            id: postId
        }
    }).then(() => {
        res.status(204).send('Post successfully deleted!');
    }).catch(() => {
        res.status(400).send();
    })
});


module.exports = router;