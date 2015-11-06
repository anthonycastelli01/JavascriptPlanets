var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlanetSchema = new Schema({
  name: String,
  planetRadius: Number,
  x: Number,
  y: Number,
  z: Number,
  textureURL: String,
  astro: {
    velocity: Number,
    mass: Number
  }
});

module.exports = mongoose.model('Planet', PlanetSchema);