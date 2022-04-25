const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../services/auth');
const { User } = require('../models');

//Admin 


/* Admin GET - displays all users */
router.get('/', async (req, res, next) => {

})