var express = require('express');
var debug = require('debug')('sharenote');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  debug("Loading home page!");
  res.render('questions', { title: 'Questions'});
});

module.exports = router;