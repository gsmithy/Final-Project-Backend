var express = require('express');
var router = express.Router();
const {User} = require('../models');

/* GET users listing for ADMIN? TBC */
router.get('/', (req, res, next) => {
  User.findAll().then(userList => {
    res.json(userList)
  })
});

/* GET user login */


module.exports = router;
