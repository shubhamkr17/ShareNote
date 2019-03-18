var mongoose = require('mongoose');

var branchSchema = mongoose.Schema({
    branchName : String,
    branchCode : String
});

var branches = mongoose.model('Branch',branchSchema);
module.exports = branches;