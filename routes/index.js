var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
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


router.post('/profile', ctrlProfile.display);

//Authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


module.exports = router;
