var express = require('express');
var debug = require('debug')('sharenote');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  debug("Loading contact page!");
  res.render('contact', { title: 'Contact'});
});

module.exports = router;