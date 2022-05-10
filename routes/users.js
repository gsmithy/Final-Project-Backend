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

/* POST USER SIGN UP */
router.post('/', async (req, res, next) => { 
  if(!req.body.user_name || !req.body.password ) {
    res.status(400).send('Username and Password required');
    return;
  };

      // User.findOne({ user_name: req.body.user_name }).then(res => {
      //   if (res) {
      //     console.log('RES:', res.user_name);
      //     //res.status(400).send('Sorry!');
        
      //   } else return;
      // })
      
  // if(req.body.user_name === user.user_name){
  //   res.status(400).send('Sorry..Username already exists!' );
  //   return;
  // };
  

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
    res.status(201).send({

            id: newUser.id,
            user_name: newUser.user_name

            })
}).catch((err) => {
    res.status(400).send("Sorry, the user you're trying to create already exists!");
    console.log(err)
});
});

/* USER GETS - User views profile page & info */
  router.get('/:username', async (req, res, next) => {
    const userProfile = req.params.username;
    
    // const user = req.user;
    //     if (!user){
    //         res.status(403).send('Please log in!');
    //         return;
    //     };

    User.find({
        where: {
            user_name: userProfile
        }
    }).then( user => {
        if (user){
            res.status(200).send({

              first_name: user.first_name,
              last_name: user.last_name,
              user_name: user.user_name,
              email: user.email,
              address: user.address,
              state: user.state,
              city: user.city,
              zip_code: user.zip_code,
              country: user.country,
              profile_pic: user.profile_pic
              
            });
        } else {
            res.status(400).send('Oops! Something went wrong!')
        }
    })
});


module.exports = router;
