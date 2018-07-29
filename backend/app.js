var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var cors = require('cors');
var jwt = require('jsonwebtoken');

// Models
var User = require('./models/User');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ladderRouter = require('./routes/ladder');

var app = express();

app.use(cors());

// Load environment variables from .env file
dotenv.load();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// mongodb connexion
mongoose.connect(process.env.MONGODB);
mongoose.connection.on('error', function () {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

app.use(function (req, res, next) {
  req.isAuthenticated = function () {
    var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, process.env.SECRET);
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated();
    User.findById(payload.sub, function (err, user) {
      req.user = user;
      next();
    });
  } else {
    next();
  }
});


// router
app.use('/', indexRouter);
app.use('/api', usersRouter);
app.use('/ladder', ladderRouter);

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
