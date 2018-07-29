var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var moment = require('moment');
var cors = require('cors')

// Models
var User = require('../models/User');
var Fight = require('../models/Fight');

function generateToken(user) {
  var payload = {
    iss: 'my.domain.com',
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(7, 'days').unix()
  };
  return jwt.sign(payload, process.env.SECRET);
}

/**
 * Login required middleware
 */
exports.ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

/* Post login */
router.post('/login', function (req, res, next) {
  User.findOne({ name: req.body.username }, function (err, user) {
    if (!user) {
      return res.status(401);
    }
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.status(401);
      }
      res.send({ token: generateToken(user), user: user.toJSON() });
    });
  });
});

/**
 * POST /signup
 */
router.post('/signin', function (req, res, next) {
  if (req.body.password != req.body.confirmation){
    return res.status(400);
  }

  User.findOne({ name: req.body.username }, function (err, user) {
    if (user) {
      return res.status(400);
    }
    user = new User({
      name: req.body.username,
      password: req.body.password,
      status: 'Online',
      point: 0
    });
    user.save(function (err) {
      res.send({ token: generateToken(user), user: user.toJSON() });
    });
  });
});

router.post('/fight/ask', function (req, res, next) {
});

/* Get Example */
router.get('/example', function (req, res, next) {
  if (req.isAuthenticated()){
    res.json({
      "example": req.user
    });
  } else {
    res.json({
      "example": "not work"
    });
  }
});

module.exports = router;
