var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    courseName : String,
    courseCode : String
});

var courses = mongoose.model('Course',courseSchema);
module.exports = courses;