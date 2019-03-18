var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var upload = require('express-fileupload');

var index = require('./routes/index');
var downloads = require('./routes/downloads');
var profile = require('./routes/profile.js');
var contribute = require('./routes/contribute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload({useTempFiles : true, tempFileDir : '/tmp/'}));


//routes
app.use('/', index);
app.use('/downloads',downloads);
app.use('/profile',profile);
app.use('/contribute',contribute);

var Course = require('./models/course');
app.get('/api/courses',function(req,res,next){
    //console.log("branch code",req.query.branchCode);
    Course.find({courseCode: {$regex: "^"+req.query.branchCode}},function(err,courses){
        if(err)
            res.render('error',{err:err});
        else
            res.json(courses);
    });
});


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
