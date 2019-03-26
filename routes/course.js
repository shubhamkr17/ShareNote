var express = require('express');
var debug = require('debug')('sharenote');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  if(req.query.branchCode) {
    debug("Loading courses page!");

    Branch.findOne({branchCode : req.query.branchCode},function(err,branch){
      if(err)
        return res.render('error',{ message:"Error!!!", error:err });
      
      if(branch == null || branch == '')
      {
        return res.render('error',{ message:"No such branch is present", error:{status:'404'} });
      }

      console.log(branch);
      var options = {
        title: 'Courses',
        branchName : branch['branchName']
      }
      res.render('courses',options);
    });

    
  }

  else {
    res.redirect('/');
  }
});

module.exports = router;