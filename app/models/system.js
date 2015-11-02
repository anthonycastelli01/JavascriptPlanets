var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SystemSchema = new Schema({
  name: String,
  planets: Array
});

module.exports = mongoose.model('System', SystemSchema);