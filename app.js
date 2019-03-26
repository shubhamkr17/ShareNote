var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var upload = require('express-fileupload');

var indexRouter = require('./routes/index');
var downloadsRouter = require('./routes/downloads');
var profileRouter = require('./routes/profile.js');
var contributeRouter = require('./routes/contribute');
var contactRouter = require('./routes/contact');
var courseRouter = require('./routes/course');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(upload({useTempFiles : true, tempFileDir : '/tmp/'}));


//routes
app.use('/', indexRouter);
app.use('/downloads',downloadsRouter);
app.use('/profile',profileRouter);
app.use('/contribute',contributeRouter);
app.use('/contact',contactRouter);
app.use('/courses',courseRouter)

//global models
global.Course = require('./models/course');
global.Branch = require('./models/branch');
global.Document = require('./models/document');
app.get('/api/courses',function(req,res,next){
    //console.log("branch code",req.query.branchCode);
    Course.find({courseCode: {$regex: "^"+req.query.branchCode}},function(err,courses){
        if(err)
            res.render('error',{err:err});
        else
            res.json(courses);
    });
});

app.get('/api/allcourses',function(req,res,next){
    Course.find({},(err,courses)=>{
        if(err)
            throw err;
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
