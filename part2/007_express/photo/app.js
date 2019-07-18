var createError = require('http-errors');
var express = require('express');
const fileUpload = require('express-fileupload')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var photosRouter = require('./routes/photos');

var app = express();

// fileUpload
app.use(fileUpload());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('photos', __dirname + '/public/photos');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', indexRouter);
// app.use('/users', usersRouter);
app.get('/', photosRouter.list);
app.get('/upload', photosRouter.form);// 如果使用use，'/upload'优先级要排到'/'之前；使用get则直接匹配
app.post('/upload', photosRouter.submit(app.get('photos')));
app.get('/photo/:id/download', photosRouter.download(app.get('photos')))


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
