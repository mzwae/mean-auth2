var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.getUserData = function(req, res){
  var userid = req.body.id;
  if(!userid){
    res.status(404);
    res.send("Error: No user id provided!");
  } else {
    User.findOne({_id: userid}, function(err, data){
      if(err){
        res.json(err);
      } else {
        res.json(data);
      }
    });
  }
  
};