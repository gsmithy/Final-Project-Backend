const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../services/auth');
const { User } = require('../models');
const cors = require("cors")

router.use(cors());

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

/* POST USER SIGN UP */
//NEEDS PIMPING!! WAS TRYING TO ADD A CHECK TO SEE THAT THE USER DOESNT ALREADY EXIST VIA
//EMAIL. THEN ANOTHER CHECK TO MAKE SURE THEY'RE USING A UNIQUE USERNAME AS A 400 WILL OCCUR APON
//THAT HAPPENING WITHOUT ANY NOTIFICATION TO THE USER. THEN CREATE USER. 
router.post('/signup', (req, res, next) => { 

res.setHeader("Acess-Control-Allow-Origin", "http://localhost:3000");

  console.log("////Its me!");
  if(!req.body.user_name || !req.body.password ) {
    console.log(req.body.user_name);
    res.status(400).send('Username and Password required');
    return;
  };
  if(req.body.user_name === User.user_name){
    console.log(req.body.user_name + 'line41');
    res.status(400).send('message: Sorry..Username already exists!' );
    return;
  };

  //const salt = await bcrypt.genSalt(10);
  //const hashedPassword = await bcrypt.hash(req.body.password, salt);
//console.log('now creating user');
  User.create({
    
    admin: req.body.admin,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    user_name: req.body.user_name, 
    password: auth.hashPassword(req.body.password),
    email: req.body.email,
    address: req.body.address,
    state: req.body.state,
    city: req.body.city,
    zip_code: req.body.zip_code,
    country: req.body.country,
    profile_pic: req.body.profile_pic
     

}).then(newUser => {
  console.log(newUser);
    res.status(201).json({
            createdUser: newUser,
            status: 200,
            message: 'user successfully created!'
            // id: newUser.id,
            // user_name: newUser.user_name

            })
}).catch((err) => {
    res.status(400).send();
    console.log(err)
});
});

module.exports = router;
