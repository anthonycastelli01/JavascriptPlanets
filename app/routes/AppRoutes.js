var express = require('express');
var router = express.Router();
var path = require('path');

router.route('/')
  .get(function(request, response) {
    response.sendFile(path.join(__dirname, "../../public/index.html"));
  });

module.exports = router;