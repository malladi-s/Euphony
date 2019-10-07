const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const express = require('express');
const expressSession = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const indexRouter = require('./routes/api/index');
const usersRouter = require('./routes/api/users');

mongoose.connect('mongodb://localhost/euphony');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressSession({
  name: 'server-session-cookie-id',
  resave: false,
  secret: 'secret',
  saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/users', usersRouter);
app.get('/sessionTest', (req, res) => {
  res.json(req.session)
})
app.use('/', indexRouter);
app.use('/*', indexRouter);

const User = require('./models/user');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler (Useless since react will handle all irrelevant frontend routes)
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
