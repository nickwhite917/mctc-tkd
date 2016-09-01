// *** main dependencies *** //


require('dotenv').load();

var express = require('express');

var path = require('path');
var morgan = require('morgan');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');

var flash = require('connect-flash');

var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

var swig = require('swig');
var passport = require('./lib/auth');
var LocalStrategy = require('passport-local').Strategy;


// *** seed the database *** //
if (process.env.NODE_ENV === 'development') {
  var seedAdmin = require('./components/admin/admin.model.seed.js');
  var registrationAdmin = require('./components/registration/registration.model.seed.js');
  seedAdmin();
  registrationAdmin();
}


// *** config file *** //
var config = require('../_config');


// *** routes *** //
var mainRoutes = require('./components/main/index.routes.js');
var registrationRoutes = require('./components/registration/registration.routes.js');
var authRoutes = require('./components/auth/auth.routes.js');
var stripeRoutes = require('./components/stripe/stripe.routes.js');
// var userAPIRoutes = require('./components/user/user.routes.js');


// *** express instance *** //
var app = express();


// *** view engine *** ///
swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


// *** static directory *** ///
app.set('views', path.join(__dirname, './components'));


// *** config middleware *** //
if (process.env.NODE_ENV !== 'test') {
  var logger = morgan('combined');
  app.use(logger);
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET_KEY || 'change_me',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(function(req, res, next){
  res.locals.success = req.flash('success');
  res.locals.danger = req.flash('danger');
  next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../', 'client')));


// *** mongo *** //
app.set('dbUrl', config.mongoURI[app.settings.env]);
mongoose.connect(app.get('dbUrl'));


// *** main routes *** //
app.use('/', mainRoutes);
app.use('/registration', registrationRoutes);
app.use('/', stripeRoutes);
app.use('/auth', authRoutes);
// app.use('/api/v1/', userAPIRoutes);


// *** error handlers *** //

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('common/error', {
      message: err.message,
      error: err
    }); 
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("/common/error", {
    message: err.message,
    error: {}
  });
});


module.exports = app;
