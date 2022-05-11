const express = require('express');
const router = express.Router();
const { User } = require('../models');
const { Post } = require('../models');
const { Additional } = require('../models');

/* GET ALL USERS - Admin displays all users */
router.get('/', async (req, res, next) => {
    const user = req.user;
        if (!user){
            res.status(403).send('Please Log In!');
            return;
        };

            if (user.user_name != 'ad'){
                res.status(403).send('Access denied!');
                return;
            };

            User.findAll()
            .then( allUsers => {
                res.status(200).send(allUsers);
            }).catch( err => {
                res.status(500).send(err)
            });
});

/* POST ADMIN POSTS - Admin creates a post */
router.post('/', async (req, res, next) => {
    const user = req.user;
        if (!user){
            res.status(401).send('Please log in!');
            return;
        };

            if (user.user_name != 'ad'){
                res.status(403).send('Access Denied!');
                return;
        };

        Post.create({

            user_name: req.body.user_name,
            location: req.body.location,
            description: req.body.description,
            UserId: user.id 
    
        }).then( newPost => {
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

/* ADMIN CREATES NEWSPOST - Admin creates updates or news post. */
router.post('/update', async (req, res, next) => {
    const user = req.user;
        if (!user){
            res.status(401).send('Please log in!');
            return;
        };

            if (user.user_name != 'ad'){
                res.status(403).send('Access Denied!');
                return;
        };

        Additional.create({

           article: req.body.article,
           UserId: user.id
    
        }).then( newPost => {
            res.status(201).send({
               
                article: newPost.article,
                createdAt: newPost.createdAt
            });
        }).catch((err) => {
            res.status(400).send(err);
        });
    });

/* PUT ADMIN UPDATES - Admin updates a post */
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
        if (user.user_name != 'ad'){
            res.status(403).send('Access Denied!');
            return;
    };
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

/* DELETE USER - Admin deletes user */
router.delete('/user/:id', async (req, res, next) => {
    const userId = parseInt(req.params.id)

        if (!userId || userId <= 0){
            res.status(400).send('Please insert an id');
            return;
        };
        const user = req.user;
             if (!user){
                res.status(403).send('Please log in!');
                return;
            };
        if (user.user_name != 'ad'){
            res.status(403).send('Access denied!');
            return;
        };
        
        User.destroy({
            where: {
                id: userId
            }
        })
        .then(() => {
            res.status(204).send('User successfully deleted!');
            return;
        })
});

/* DELETE POST - Admin deletes a post */
router.delete('/:id', async (req, res, next) => {
    const postId = parseInt(req.params.id)

        if (!postId || postId <= 0){
            res.status(400).send('Please insert an id');
            return;
        };
        const user = req.user;
             if (!user){
                res.status(403).send('Please log in!');
                return;
            };
        if (user.user_name != 'ad'){
            res.status(403).send('Access denied!');
            return;
        };
        Post.destroy({
            where: {
                id: postId
            }
        })
        .then(() => {
            res.status(204).send('Post successfully deleted!');
            return;
        })
});

module.exports = router;