var seed 					= 40,
		map_width 		= 60,
		map_height 		= 40,
		star_density 	= 0.09;

var minPlanets 		= 1,
		maxPlanets 		= 3;

init();

function init() {
	var star_field = create_stars(seed, map_width, map_height, star_density);
	visual_output(star_field);
	planet_map = create_planets(star_field);
}

function create_stars(seed, width, height, density) {
	var output_values = [];

	for (var y = 0; y < height; y++) {
		output_values[y] = new Array(width);
	}

	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			if (Math.random() < density) {
				output_values[y][x] = Math.random();
				console.log("Star generated at ", x, " ", y, " with seed ", output_values[y][x]);
			}
			else
			{
				output_values[y][x] = 0;
			}
		}
	}

	return output_values
}

function create_planets(star_field) {
	var planet_map = [];

	for (var y = 0; y < star_field.length; y++) {
		planet_map[y] = new Array(star_field[0].length);
	}

	for (var y = 0; y < planet_map.length; y++) {
		for (var x = 0; x < planet_map[0].length; x++) {
			if (star_field[y][x] > 0) {
				planet_map[y][x] = system_generator(star_field[y][x], minPlanets, maxPlanets, x, y);
			}
		}
	}

	return planet_map
}

function system_generator(seed, min, max, x, y) {
	var planet_seeds = [];
	var numPlanets = Math.floor((Math.random()*max)+min);

	console.log("Number of planets at location", x, ",", y, " is: ", numPlanets);

	for (var i = 0; i < numPlanets; i++) {
		planet_seeds[i] = Math.random();
		console.log("Planet ", i, " has a seed of ", planet_seeds[i]);
	}

	return planet_seeds
}

function visual_output(array_in) {
	for (var y = 0; y < array_in.length; y++) {
		for (var x = 0; x < array_in[0].length; x++) {
			if (array_in[y][x] > 0) {
				document.write('<span class="star">O </span>');
			} else {
				document.write('<span class="void">- </span>');
			}
		}
		document.write("<br>");
	}

	//document.write("<br>");
}