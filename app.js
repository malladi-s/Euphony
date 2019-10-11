const appConfig = require('./config.js');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
const createError = require('http-errors');
const express = require('express');
const expressSession = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const artists = require('./routes/api/artists');
const albums = require('./routes/api/albums')
const indexRouter = require('./routes/api/index');
const usersRouter = require('./routes/api/users');
const authenticationRouter = require('./routes/api/authentication');

mongoose.connect('mongodb://localhost/euphony');

mongoose.Promise = global.Promise;

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
  name: 'server-session-cookie-id',
  resave: false,
  secret: appConfig.expressSession.secret,
  saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/albums', albums);
app.use('/api/artists', artists);
app.use('/api/users', usersRouter);
app.use('/api/authentication', authenticationRouter);

app.use('/', indexRouter);
app.use('/*', indexRouter);

const User = require('./models/user');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
