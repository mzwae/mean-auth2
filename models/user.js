var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

//define schema for our user model
var userSchema = mongoose.Schema({
  local: {
    name: String,
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    name: String,
    email: String,
    picture: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String,
    picture: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
    picture: String
  }
});

//methods--------------

//generating  a hash
userSchema.methods.setPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.generateJwt = function () {
  var expiry = new Date();

  //create expiry date object and set it for 7 days
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    email: this.local.email,
    name: this.local.name,
    exp: parseInt(expiry.getTime() / 1000)
  }, process.env.JWT_SECRET);
};

//create the model for users and expose it to our app
//module.exports = mongoose.model('User', userSchema);
mongoose.model('User', userSchema);