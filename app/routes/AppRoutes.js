var express = require('express');
var router = express.Router();
var path = require('path');
var System = require('../models/system');
var Planet = require('../models/planet');

router.route('/')
  .get(function(request, response) {
    response.sendFile(path.join(__dirname, "../../public/index.html"));
  });

router.route('/regenerate')
  .get(function(request, response) {
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

    var GALAXY_WIDTH = 5;
    var GALAXY_HEIGHT = 5;

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

    var systemGenerator = function(seed, x, y) {
      this.seed = seed;
      console.log("System initialized with seed " + seed + ".");

      this.system = new System();

      this.system.name = "Test System Name";
      this.system.starColor = "red";
      this.system.x = x;
      this.system.y = y;

      this.system.save(function(err) {
        if (err) {
          response.send(err);
        }
      });

      this.populatePlanets();
    }

    systemGenerator.prototype.populatePlanets = function() {
      var numberOfPlanets = this.seed[3];
      console.log("Populating system...");
      console.log("The seed for ths system is " + this.seed + ".");
      console.log("That gives us " + numberOfPlanets + " planet(s) to form.");
      console.log("Forming planets...");
      // Generate planets for the current system
      for (var i = 0; i < numberOfPlanets; i++) {
        var planet = new Planet();

        planet.name = "Test Name";
        planet.planetRadius = 100;
        planet.x = 150;
        planet.y = 0;
        planet.z = 0;
        planet.textureURL = "saturn.jpg";
        planet.astro = {
          velocity: 100,
          mass: 100
        }

        this.system.planets.push(planet);
      }


      console.log("Planets formed!");
      console.log("System formed.");
    }

    for (var y_loc = 0; y_loc < GALAXY_HEIGHT; y_loc++) {
      output = [];
      for (var x_loc = 0; x_loc < GALAXY_WIDTH; x_loc++) {
        if (galaxy[x_loc][y_loc] != 0) {
          var sysGen = new systemGenerator(String(galaxy[x_loc][y_loc]), x_loc, y_loc);
        }
      }
      console.log(output.join(" "));
    }

    response.send("Done generating systems!")
  });

module.exports = router;