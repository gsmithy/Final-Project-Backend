const express = require('express');
const router = express.Router();
const { Post } = require('../models');
const { Comment } = require('../models')


/* GET DASHBOARD POSTS - User sees all his posts */
router.get('/:username', async (req, res, next) => {
    const whosePosts = req.params.username;
    
    // const user = req.user;
    //     if (!user){
    //         res.status(403).send('Please log in!');
    //         return;
    //     };

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

    // if (user.user_name != req.body.user_name){
    //     res.status(403).send('You can only post as yourself!');
    //     return;
    // };

    Post.create({

        user_name: req.body.user_name, 
        description: req.body.description,
        location: req.body.location,
        UserId: user.id 

    }).then(newPost => {
        res.status(201).send({
            user_name: newPost.user_name,
            location: newPost.location,
            description: newPost.description,
            createdAt: newPost.createdAt 
        });
    }).catch(() => {
        res.status(400).send();
    });
});

/* POST CREATE COMMENT - User creates a comment on a post */
router.post('/comment', async (req, res, next) => {
    const user = req.user;
    if (!user){
        res.status(403).send('Please log in!');
        return;
    };

    // if (user.user_name != req.body.user_name){
    //     res.status(403).send('You can only post as yourself!');
    //     return;
    // };
    const postId = Post.id; 
    Comment.create({

        comment: req.body.comment,
        PostId: postId

    }).then( newComment => {
        res.status(201).send({
            comment: newComment.comment,
            createdAt: newComment.createdAt,
            PostId: newComment.postId
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
    // if (user.user_name != req.body.user_name){
    //     res.status(403).send('You can only post as yourself!');
    //     return;
    // };

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

    // if (user.user_name != req.body.user_name){
    //     res.status(403).send('You can only post as yourself!');
    //     return;
    // };

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

/* USER LIKES - User adds a like to a post */
router.post('/like', async (req, res, next) => {
    const user = req.user;
        if (!user){
            res.status(403).send('Please Log In!');
            return;
        };

    Comment.create({

        like: req.body.like,
        
    }).then(newState => {
        res.json({
            like: newState.like
        })
    }).catch(err => {
        res.status(400).send(err)
    })
});

/* USER LOVES - User adds a love */
router.post('/love', async (req, res, next) => {
    const user = req.user;
        if (!user){
            res.status(403).send('Please Log In!');
            return;
        };

    Comment.create({

        love: req.body.love,
        
    }).then(newState => {
        res.json({
            love: newState.love
        })
    }).catch(err => {
        res.status(400);
        console.log(err)
    })
});


module.exports = router;