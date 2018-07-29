// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var fightSchema = new mongoose.Schema({
  player1: { type: Schema.Types.ObjectId, ref: 'User' },
  player2: { type: Schema.Types.ObjectId, ref: 'User' },
  time: Date,
  winner: { type: Schema.Types.ObjectId, ref: 'User' },
  x1: Number,
  x2: Number,
  hitbox1: Number,
  hitbox2: Number,
  life1: Number,
  life2: Number,
});

var Fight = mongoose.model('Fight', fightSchema);

module.exports = Fight;
