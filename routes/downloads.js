var express = require('express');
var fs = require('fs');
var debug = require('debug')('sharenote');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  debug("Loading download page!");

  if(req.query.courseCode) {

    Course.findOne({courseCode:req.query.courseCode},function(err,course){
      if(err) {
        return res.render('error',{message:"Error!!!",error:err});
      }
      if(!course) {
        return res.render('error',{ message:"No such course is present", error:{status:'404'} })
      }

      
      var branchCode = req.query.courseCode.substring(0,2);
      console.log("code",branchCode);

      let queries = [
        Document.find({courseCode:req.query.courseCode}),
        Branch.find({}),
        Branch.findOne({branchCode:branchCode})
      ];
  
      Promise.all(queries)
      .then(results=>{
          res.render('downloads',{
            title:'Downloads',
            branchName:results[2]['branchName'],
            courseName : course['courseName'],
            documents:results[0],
            branches:results[1]
          });
      })
      .catch(err=>{
        res.render('error',{message:"Error!!!",error:err});
      });

    });   

  }
  else {
    res.redirect('/');
  }

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


router.post('/',async function(req,res,next){
  debug(req.body);
  debug(req.files);
  if (Object.keys(req.files).length == 0) {
    return res.render('error',{message:"No file selected",error:{ status:"400" }});
    // res.status(400).end('File not uploaded.');
  }
  
  debug("file",req.files.file);
  const file = req.files.file;

  var pathDir = "./public/files/documents/";
  var virtualPathDir = 'files/documents/'
  if(!fs.existsSync(pathDir)){
    fs.mkdirSync(pathDir);
  }

  var path = pathDir + file.name;
  var virtualPath = virtualPathDir + file.name;

  file.mv(path,(err)=>{
    if (err) {
      return res.render('error',{message:"File could not be uploaded",error:err});
    }
  });
  
  debug("vpath",virtualPath);

  var courseCode = req.query.courseCode;
  var branchCode = courseCode.substring(0,2);

  const document = new Document({
    name : file.name,
    displayName : req.body.name,
    description : req.body.description,
    url: virtualPath,
    docType : file.mimetype,
    docSize : file.size,
    branchCode : branchCode,
    courseCode : courseCode
  });
  debug("document",document);
  await document.save(function(err,doc){
    if(err)
    {
      debug("error uploading");
      return res.render('error',{message:"Please try again.",error:err})
    }

    var options = {
      title : "Thank you",
      heading : "File uploaded successfully",
      message : "Please check your profile for your contributions."
    }
    res.render('thank',options);
  });
});

module.exports = router;