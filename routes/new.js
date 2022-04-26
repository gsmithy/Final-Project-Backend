const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { Post, post } = require('./admin');
const auth = require('../services/auth');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res, next) => {
 
});

