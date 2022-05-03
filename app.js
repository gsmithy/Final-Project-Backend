var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var models = require('./models');
var cors = require('cors');
var auth = require('./services/auth');
var mysql = require('mysql2')


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

//SYNC DB TO MODELS
models.sequelize.sync({alter: true}).then(() => {
  console.log('goodnews is Synced!')
});
//CREATE CONNECTION TO DB
  const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'bethel123',
  database: 'goodnews'
});
  connection.connect((err) => {
    if (err) {
    console.error(err.message);
    return;
  }
  console.log('Nice! You are connected to the DB!')
});

//REAUSABLE AUTH CHECK 
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
//CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/admin', adminRouter);



module.exports = app;
