const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../services/auth');
const { User } = require('../models');


/* POST USER LOGIN */
router.post('/login', async (req, res, next) => {
  User.findOne({
    where: {
      user_name: req.body.user_name
    }
  }).then( async user => {
    if (!user) {
      res.status(404).send('Invalid Username');
      return;
    };
    const valid = await bcrypt.compare(req.body.password, user.password);

    if (valid) {
      const jwt = auth.createJWT(user);
      res.status(201).send({ jwt }); 
    } else {
      res.status(401).send("Invalid Password!");
    }
  });
});
/* GET LOGOUT - User logs out */
router.get('/logout', async (req, res, next) => {
  // res.cookie('jwt', "", { expires: new Date(0) });
  auth.terminateJWT();
  res.status(204).send('You are logged out!')

})

/* POST USER SIGN UP */
router.post('/', async (req, res, next) => { 
  if(!req.body.user_name || !req.body.password ) {
    res.status(400).send('Username and Password required');
    return;
  };
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    User.create({
      
      admin: req.body.admin,
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
      profile_pic: req.body.profile_pic
       

  }).then(newUser => {
      res.json({

              id: newUser.id,
              user_name: newUser.user_name

              })
  }).catch((err) => {
      res.status(400).send();
      console.log(err)
  });
});

module.exports = router;
