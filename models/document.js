var mongoose = require('mongoose');

var documentSchema = mongoose.Schema({
    name : { type:String, required:true},
    url : { type:String, required:true},
    docSize : { type:String },
    docType : { type:String },
    contributerName : {type: String, default:"Shubham"},
    contributerId : {type: String, default:"123456"}
});

var documents = mongoose.model('Document',documentSchema);
module.exports = documents;