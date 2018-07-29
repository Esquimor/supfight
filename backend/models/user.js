// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var userSchema = new mongoose.Schema({
  name: String,
  password: String,
  point: Number,
  status: {
    type: String,
    enum: ['Offline','Online', 'Waiting', 'Fight'],
    default: 'Online'
  }
});

userSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    cb(err, isMatch);
  });
};

userSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    delete ret.password;
  }
};

var User = mongoose.model('User', userSchema);

module.exports = User;
