var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost');
var System = require('./app/models/system')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

// Setup routes
var appRouter = require("./app/routes/AppRoutes");
var planetsRouter = require("./app/routes/PlanetRoutes");

// Register routes
app.use("/", appRouter);

// Serve static pages in public folder
app.use(express.static(__dirname + '/public'));

app.listen(port);
console.log('Listening on port ' + port);