var express = require('express');
var router = express.Router();

router.route('/')
  .get(function(request, response) {
    response.sendfile("public/index.html");
  });

module.exports = router;