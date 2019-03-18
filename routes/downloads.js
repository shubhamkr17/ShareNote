var express = require('express');
var debug = require('debug')('sharenote');
var router = express.Router();

var Document = require('../models/document');
var Branch = require('../models/branch');

/* GET home page. */
router.get('/', function(req, res) {
  debug("Loading download page!");

  let queries = [
    Document.find({}),
    Branch.find({})
  ];

  Promise.all(queries)
  .then(results=>{
      res.render('downloads',{
        title:'Downlaods',
        documents:results[0],
        branches:results[1]
      });
  })
  .catch(err=>{
    res.render('error');
  });

  // Document.find({})
  // .then(documents=>{
  //   debug("downloads",documents);
  //   res.render('downloads',{title:'Downloads',documents:documents});
  // })
  // .catch(err=>{
  //   res.render('error');
  // });

  //res.render('downloads', { title: 'Downloads'});
});

module.exports = router;