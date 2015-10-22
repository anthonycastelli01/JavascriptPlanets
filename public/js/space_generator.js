// Galaxy constants
var SEED 					= 40,
		MAP_WIDTH 		= 50,
		MAP_HEIGHT 		= 50,
		STAR_DENSITY 	= 0.09;

// System ranges
var minPlanets 		= 1,
		maxPlanets 		= 3;

init();

function init() {
	// Generate a field of seed values dispersed based on the density
	//  and size of the region of space
	// var starField = generateSeeds(SEED, MAP_WIDTH, MAP_HEIGHT, STAR_DENSITY);
	var starField = generateLinearlyWeightedSeeds(SEED, MAP_WIDTH, MAP_HEIGHT, STAR_DENSITY);
	// Display field on the page
	displayGalaxy(starField);
	// Generate planets for systems based on seed input
	planetMap = createPlanets(starField);
}

function generateSeeds(seed, width, height, density) {
	var seedMap = [];

	// Generate an array to hold the stars
	for (var y = 0; y < height; y++) {
		seedMap[y] = new Array(width);
	}

	// Loop to fill the new empty array with stars
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			// Compare a random number to the density desired
			if (Math.random() < density) {
				// If below density threshold add a seed value into the array
				seedMap[y][x] = Math.random();
				// console.log("Star generated at ", x, " ", y, " with seed ", seedMap[y][x]);
			} else {
				// Otherwise the system has no value
				seedMap[y][x] = 0;
			}
		}
	}

	return seedMap
}

function generateLinearlyWeightedSeeds(seed, width, height, density) {
	var seedMap = [];
	var weightedX = MAP_WIDTH / 2; // For a vertical weight

	// Generate an array to hold the stars
	for (var y = 0; y < height; y++) {
		seedMap[y] = new Array(width);
	}

	// Loop to fill the new empty array with stars
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			// Compute the probability of a star existing here
			var probability = Math.exp(-(Math.pow(x - (MAP_WIDTH/2),2)/(MAP_WIDTH)));
			console.log(probability);

			if (Math.random() < probability) {
				// If below density threshold add a seed value into the array
				seedMap[y][x] = Math.random();
				// console.log("Star generated at ", x, " ", y, " with seed ", seedMap[y][x]);
			} else {
				// Otherwise the system has no value
				seedMap[y][x] = 0;
			}
		}
	}

	return seedMap
}

function createPlanets(starField) {
	var planetMap = [];

	// Build an array the same shape as the seed field
	for (var y = 0; y < starField.length; y++) {
		planetMap[y] = new Array(starField[0].length);
	}

	// Loop over this new array
	for (var y = 0; y < planetMap.length; y++) {
		for (var x = 0; x < planetMap[0].length; x++) {
			// If the seed for this system is a value one for planets
			if (starField[y][x] > 0) {
				// Generate a system at these coordinates and put it in the planet map
				planetMap[y][x] = systemGenerator(starField[y][x], minPlanets, maxPlanets, x, y);
			}
		}
	}

	return planetMap
}

function systemGenerator(seed, min, max, x, y) {
	var planetSeeds = [];
	// Give the system a number of planets
	var numPlanets = Math.floor((Math.random()*max)+min);

	// console.log("Number of planets at location", x, ",", y, " is: ", numPlanets);

	// Give each planet a seed value
	for (var i = 0; i < numPlanets; i++) {
		planetSeeds[i] = Math.random();
		// console.log("Planet ", i, " has a seed of ", planetSeeds[i]);
	}

	return planetSeeds
}

function displayGalaxy(array_in) {
	var starMap = $("pre#starMap")[0];

	for (var y = 0; y < array_in.length; y++) {
		var row = $('<div class="row">').appendTo(starMap);
		for (var x = 0; x < array_in[0].length; x++) {
			if (array_in[y][x] > 0) {
				row.append($('<span class="star">O </span>'));
			} else {
				row.append($('<span class="void">- </span>'));
			}
		}
	}
}