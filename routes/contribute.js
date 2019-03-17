var express = require('express');
var fs = require('fs');
var debug = require('debug')('contribute');
var router = express.Router();

var Document = require('../models/document');

/* GET upload page. */
router.get('/', function(req, res,next) {
  debug("Loading upload page!");
  res.render('contribute', { title: 'Contribute'});
});

router.post('/',async function(req,res,next){
  debug(req.body);
  debug(req.files);
  if (Object.keys(req.files).length == 0) {
    res.status(400).end('File not uploaded.');
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
    if (err)
      res.status(500).send(err);
  });
  
  debug("vpath",virtualPath);



  const document = new Document({
    name : file.name,
    url: virtualPath,
    docType : file.mimetype,
    docSize : file.size,
  });
  debug("document",document);
  await document.save(function(err,doc){
    if(err)
    {
      debug("error uploading");
      res.end("Error in uploading!");
    }
    res.end("uploaded successfully!");
  });
});


module.exports = router;