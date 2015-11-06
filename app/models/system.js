var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SystemSchema = new Schema({
  name: String,
  starColor: String,
  x: Number,
  y: Number,
  planets: Array
});

module.exports = mongoose.model('System', SystemSchema);