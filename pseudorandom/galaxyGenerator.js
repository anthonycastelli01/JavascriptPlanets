/*
  Generator for new fields of stars
*/
var fieldGenerator =  function(seed) {
  this.m = 9999999999; // Max value
  this.a = 11;
  this.c = 17;

  this.z = seed; // Seed
};

fieldGenerator.prototype.nextValue = function() {
  this.z = (this.a * this.z + this.c) % this.m;
  return this.z;
}

var galaxy = [];
var generator = new fieldGenerator(6189795027);

var GALAXY_WIDTH = 7;
var GALAXY_HEIGHT = 7;

// Fill the galaxy with seeds for new star systems
for (var h = 0; h < GALAXY_HEIGHT; h++) {
  galaxy.push(Array(GALAXY_WIDTH))
}

for (var y_loc = 0; y_loc < GALAXY_HEIGHT; y_loc++) {
  for (var x_loc = 0; x_loc < GALAXY_WIDTH; x_loc++) {
    var new_seed = generator.nextValue()
    if (new_seed > 5000000000) {
      stringSeed = String(new_seed).split(""); // Convert seed to string and split it apart
      stringSeed.shift(); // Pull off first digit
      new_seed = stringSeed.join("");
      galaxy[x_loc][y_loc] = new_seed;
    } else {
      galaxy[x_loc][y_loc] = 0;
    }
  }
}

var systemGenerator = function(seed) {
  this.seed = seed;
  console.log("System initialized with seed " + seed + ".");
  return this.populate(); // Should return an object storing all system data
}

systemGenerator.prototype.populate = function() {
  console.log("Populating system...");
  console.log("The seed for ths system is " + this.seed + ".");
  console.log("That gives us " + this.seed[3] + " planet(s) to form.");
  console.log("System formed.");
}

for (var y_loc = 0; y_loc < GALAXY_HEIGHT; y_loc++) {
  output = [];
  for (var x_loc = 0; x_loc < GALAXY_WIDTH; x_loc++) {
    if (galaxy[x_loc][y_loc] > 0) {
      output.push(galaxy[x_loc][y_loc].toString());
    } else {
      output.push("---------")
    }
  }
  console.log(output.join(" "));
}

var sysGen = new systemGenerator("618344854");