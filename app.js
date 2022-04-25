var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var models = require('./models');
var auth = require('./services/auth'); //adding this line broke the app "too many keys specified; max 64 keys allowed" error. See solution on line 24


var usersRouter = require('./routes/users');
var homeRouter = require('./routes/home');
var postsRouter = require('./routes/posts');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Sync DB to models
models.sequelize.sync({alter:true}).then(function(){ //"force: true" is only for development, we will change it to "force: false" after dev. WARNING! THIS WILL DELETE DATA!
  console.log('GoodNews is Synced!')
});

app.use(async (req, res, next) => {
  //get token from the request

const header = req.headers.authorization; //receives the token

if (!header) {
    return next();
}

//splits string of token at the 'space' - separates Bearer and hash to get the hash.
const token = header.split('')[1];

// validate/verify - get the user from the token
const user = await auth.verifyUser(token);
req.user = user;
next();
});

app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
