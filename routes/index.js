var passport = require('passport');
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var path = require('path');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload' //define property on req to be payload
});
//var ctrlLocations = require('../controllers/locations');
//var ctrlReviews = require('../controllers/reviews');
var ctrlAuth = require('../controllers/authentication');
var ctrlProfile = require('../controllers/profile');
/*//locations
router.get('/locations', ctrlLocations.locationListByDistance);

router.post('/locations', ctrlLocations.locationsCreate);

router.get('/locations/:locationid', ctrlLocations.locationsReadOne);

router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne);

router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne);


//reviews
router.post('/locations/:locationid/reviews', auth, ctrlReviews.reviewsCreate);

router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);

router.put('/locations/:locationid/reviews/:reviewid', auth, ctrlReviews.reviewsUpdateOne);

router.delete('/locations/:locationid/reviews/:reviewid', auth, ctrlReviews.reviewsDeleteOne);*/

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client', 'index.html'));
});
router.post('/userdata', auth, ctrlProfile.getUserData);

//Authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


/*****************Social Media Accounts Authentication**************/

/********FACEBOOK ROUTES********/
//route for facebook authentication and login
router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

/*router.get('/auth/facebook', function(req, res){
  res.send("Facebook authentication request received");
});*/

//handle the callback after facebook has authenticated the user
/*router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/'
}));*/

router.get('/auth/facebook/callback', passport.authenticate('facebook', function(req, res){
 console.log('req is: ', req);
 console.log('res is: ', res);
  
}));


/****TWITTER ROUTES****/
//route for twitter authentication and login
router.get('/auth/twitter', passport.authenticate('twitter'));
/*router.get('/auth/twitter', function(req, res){
  res.send("Twitter authentication request received");
});*/

//handle the callback after twitter has authenticated the user
/*router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/profile',
  failureRedirect: '/'
}));*/


router.get('/auth/twitter/callback', passport.authenticate('twitter', function(req, res){
 console.log('req.body is: ', req.body);
 console.log('res.body is: ', res.body);
  
}));
/*router.get('/auth/twitter/callback', function(req, res){
  res.send("url has been transfered to callback url");
});*/

/****GOOGLE ROUTES****/
//send to google to do authentication
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

//handle the callback after google has authenticated the user
router.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/'
}));

/******************LINKING ACCOUNTS ROUTES***************************/

/**********************LOCAL************************/
router.get('/connect/local', function (req, res) {
  res.render('connect-local.ejs', {
    message: req.flash('loginMessage')
  });
});

router.post('/connect/local', passport.authenticate('local-signup', {
  successRedirect: '/profile', //redirect to the secure profile section
  failureRedirect: '/connect/local', //redirect back to the signup page if error
  failureFlash: true //allow flash messages
}));

/**********************FACEBOOK********************/
//send to facebook to do the authentication
router.get('/connect/facebook', passport.authorize('facebook', {
  scope: ['public_profile', 'email']
}));

//handle the callback after facebook has authorized the user
router.get('/connect/facebook/callback', passport.authorize('facebook', {
  successRedirect: '/profile',
  failureRedirect: '/'
}));

/**********************TWITTER*********************/
//send to twitter to do the authentication
router.get('/connect/twitter', passport.authorize('twitter', {
  scope: 'email'
}));

//handle the callback after twitter has authorized the user
router.get('/connect/twitter/callback', passport.authorize('twitter', {
  successRedirect: '/profile',
  failureRedirect: '/'
}));

/**********************GOOGLE**********************/
//send to google to do authentication
router.get('/connect/google', passport.authorize('google', {
  scope: ['profile', 'email']
}));

//handle the callback after google has authorized the user
router.get('/connect/google/callback', passport.authorize('google', {
  successRedirect: '/profile',
  failureRedirect: '/'
}));


/******************UNLINKING ACCOUNTS ROUTES***************************/
/*
1. For social accounts, remove token only in case the user changes their mind.
2. For local accounts, remove email and password.
3. User account will stay active in case they want to reconnect in the future.
*/

//local--------------------------------------
router.get('/unlink/local', function (req, res) {
  var user = req.user;

  /*   user.updateOne({}, {$unset: {local: ""}});
     db.movieDetails.updateMany({rated: null}, {$unset: {rated: ""}})*/
  user.local.email = undefined;
  user.local.password = undefined;
  user.save(function (err) {
    res.redirect('/profile');
  });
});

//facebook-----------------------------------
router.get('/unlink/facebook', function (req, res) {
  var user = req.user;
  user.facebook.token = undefined;
  user.save(function (err) {
    res.redirect('/profile');
  });
});

//twitter------------------------------------
router.get('/unlink/twitter', function (req, res) {
  var user = req.user;
  user.twitter.token = undefined;
  user.save(function (err) {
    res.redirect('/profile');
  });
});

//google-------------------------------------
router.get('/unlink/google', function (req, res) {
  var user = req.user;
  user.google.token = undefined;
  user.save(function (err) {
    res.redirect('/profile');
  });
});

//Route middleware to make sure a user is logged in
/*function isLoggedIn(req, res, next) {

  //if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next();
  }

  // if they aren't rediret them to the home page
  res.redirect('/');
}*/


module.exports = router;