var express = require('express');
var router = express.Router();
const { User } = require('../models');

/* GET users listing for ADMIN? TBC */
router.get('/', (req, res, next) => {
  User.findAll().then(userList => {
    res.json(userList)
  })
});

//Sign Up
router.post('/', async function(req, res, next) {

  if(!req.body.user_name || !req.body.password ) {
    res.status(400).send('Username and Password required');
    return;
  }

  User.create({
      //admin: req.body.admin,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_name: req.body.user_name, 
      password: req.body.password,
      email: req.body.email,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      zip_code: req.body.zip_code,
      country: req.body.country,
      UserId: user.id
  }).then(newUser => {
      res.json(newUser);
  }).catch(() => {
      res.status(400).send();
  });
});

//Login


module.exports = router;
