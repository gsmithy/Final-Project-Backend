var express = require('express');
var router = express.Router();
const { User } = require('../models');
var bcrypt = require('bcrypt');
const async = require('hbs/lib/async');

/* GET users listing for ADMIN? TBC */
router.get('/', (req, res, next) => {
  User.findAll().then(userList => {
    res.json(userList)
  })
});

//Sign Up
router.post('/', async function(req, res, next) { // is async correct syntax?

  if(!req.body.user_name || !req.body.password ) {
    res.status(400).send('Username and Password required');
    return;
  }
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


  User.create({
      //admin: req.body.admin,  Does this need to be here?
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      user_name: req.body.user_name, 
      password: hashedPassword,
      email: req.body.email,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      zip_code: req.body.zip_code,
      country: req.body.country,
      UserId: user.id 
  }).then(newUser => {
      res.json({
        id: newUser.id,
        user_name: newUser.user_name
      });
  }).catch(() => {
      res.status(400).send();
  });
});

//Login
router.post('/login', async function(req, res, next) {
  User.findOne({
    where: {
      user_name: req.body.user_name
    }
  }).then(async user =>{
    if (!user) {
      res.status(404).send('Invalid Username');
      return;
    }
    const valid = await bcrypt.compare(req.body.password, user.password);

    if (valid) {
      res.status(200).send('Hi!' + user.user_name);
    } else {
      res.status(401).send("Invalid Password");
    }
  });
});


module.exports = router;
