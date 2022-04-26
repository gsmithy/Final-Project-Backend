var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var models = require('./models');
var cors = require('cors');
var auth = require('./services/auth');


var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var postsRouter = require('./routes/posts');
var adminRouter = require('./routes/admin');



var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); //Cross-origin request. Adjusts permission for this server to be accessed by a client.

//Sync DB to models
models.sequelize.sync({ alter: true }).then(function(){
  console.log('goodnews is Synced!')
});

//Reuseable Auth check
app.use( async (req, res, next) => {
    const header = req.headers.authorization; 
      if (!header) {
        return next();
  };
    const token = header.split(' ')[1];
    const user = await auth.verifyUser(token);

    req.user = user;
    next();
});

app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/admin', adminRouter);


module.exports = app;
