var express = require('express');
var router = express.Router();
//var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signup', function(req, res, next) {
  models.users
  .findorcreate({
    where: { UserName: req.body.username }, // <-- "username" has to match the front end html component "username"
    defaults: {                             //Depends on what Ron and Con name the form
      FirstName: req.body.firstName,
      LastName: req.body.lastName,
      Email: req.body.lmail,
      Password: req.body.password
    }
  }) .spread(function(result, created) {
    if(created){
      res.send("User successfuly created");
    } else {
      res.send('This user already exists');
    }
  });                                 
});


module.exports = router;
