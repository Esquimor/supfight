var express = require('express');
var router = express.Router();
var Fight = require('../models/Fight');

/* GET ladder. */
router.get('/', function (req, res, next) {
  Fight
    .find()
    .populate('winner')
    .exe(function(err, fights){
      
    });
});

module.exports = router;
