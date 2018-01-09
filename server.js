//set up -------------------
var morgan = require('morgan');
require('dotenv').load();
var express = require('express');
var app = express();
app.use(morgan('dev')); //log every request to the console
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport'); //before db model
require('./models/user');
var flash = require('connect-flash');
var path = require('path');



var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');



//configuration------------------

var dbURI = 'mongodb://localhost/mean-auth2';
var databaseType = "LOCAL";


mongoose.connect(dbURI, function () {
  if (process.env.NODE_ENV === 'production') {
    databaseType = "REMOTE";
    dbURI = process.env.dbURI;
  }
  console.log("App server successfully connected to", databaseType, "Database server!");
});


require('./config/passport'); //configuration after db model
var routes = require('./routes/index');


//set up our express application-------------------

app.use(cookieParser()); //read cookies - needed for auth
app.use(bodyParser.json()); //get information from html forms
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));
//app.set('views', path.join(__dirname, 'client', 'index.html'));

//required for passport---------------------------
/*app.use(session({
  secret: 'ilovescotchscotchyscotchscotch', // session secret
  resave: true,
  saveUninitialized: true
}));*/
app.use(passport.initialize());
//app.use(passport.session());//persist login sessions
app.use(flash()); //use connet-flash for flash messages stored in session
//require('./config/passport')(passport);//pass passport for configuration
//require('./app/routes.js')(app, passport);//load our routes and pass in our app and fully configured passport

app.use('/', routes);


// Auth middleware error handler
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({
      "message": err.name + ": " + err.message
    });
  }
});

//launch-----------------------
app.disable("x-powered-by");

app.listen(port, function () {
  console.log('node-auth server listening on port ', port);
});