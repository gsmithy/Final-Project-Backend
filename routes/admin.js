const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../services/auth');
const { User } = require('../models');

/* Admin give user admin priviledges */
router.put('/', async (req, res, next) => { 
  
    //Validation/Verification
    if(!req.body.user_name || !req.body.password ) {
      res.status(400).send('Username & Password required!');
      return;
    }
      //Encryption - (hashing) password
      const salt = await bcrypt.genSalt(10); //genSalt is asyncronous, so we have to specify waiting.
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
  
    await User.update({
        
        position: req.body.position
        
    }).then(newAdmin => {
        res.json({
          id: newAdmin.id,
          user_name: newAdmin.user_name
        });
    }).catch(() => {
        res.status(400).send();
    });
  });
  
  

/* User Login */
router.post('/admin', async (req, res, next) => {
    User.findOne({
      where: {
        user_name: req.body.user_name
      }
    }).then(async user => {
      //Validation/Verification - check if user exists
      if (!user) {
        res.status(404).send('Invalid Username');
        return;
      };
      //Authentication - check if user exists
      const valid = await bcrypt.compare(req.body.password, user.password);
  
      if (valid) {
      // Create the JWT token
        const jwt = auth.createJWT(user);
        res.status(200).send({ jwt }); //We send a Json Object.
      } else {
        res.status(401).send("Invalid Password!");
      }
    });
  });
  
  
  module.exports = router;
  