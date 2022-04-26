const express = require('express');
const router = express.Router();
const { User } = require('../models');


/* ADMIN GET ALL USERS - displays all users */
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
            res.json(allUsers)
        }).catch( err => {
            res.status(500).send(err)
        })
});

/* ADMIN DELETES USER */
router.delete('/:id', async (req, res, next) => {
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
//          Admin Check
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


module.exports = router;