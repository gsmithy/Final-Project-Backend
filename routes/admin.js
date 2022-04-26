const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../services/auth');
const { User } = require('../models');

/* Admin DELETS USER */

router.delete('/:id', async (req, res, next) => {
    const userId = pareseInt(req.params.id)

        if (!userId || userId <= 0){
            res.status(400).send('Please insert an id');
            return;
        };
        if (!User.admin){
            res.status(403).send('Access denied!');
            return;
        };

    const header = req.headers.authorization;

        if (!header){
            res.status(403).send('Access restricted!');
            return res.redirect('/admin');
        };

        const token = header.split(' ')[1];
        const user = auth.verifyUser(token);

        if (!user){
            res.status(403).send('Access denied!')
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




/* ADMIN GET ALL USERS - displays all users */
router.get('/', async (req, res, next) => {

});