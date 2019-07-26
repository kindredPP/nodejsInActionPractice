var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login')
var entriesRouter = require('./routes/entries')
// 全局消息提示中间件
var messages = require('./lib/messages')
var user = require('./lib/middleware/user')
var validate = require('./lib/middleware/validate')
var page = require('./lib/middleware/page')
var Entry = require('./lib/entry')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 打开解析 user[name] 可解析为 user.name
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret :  'secret', // 对session id 相关的cookie 进行签名
  resave : true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
      maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  },
}))
app.use(user)
app.use(messages)

// app.use('/', indexRouter);
app.get('/register', registerRouter.form);
app.post('/register', registerRouter.submit);
app.get('/login', loginRouter.form)
app.post('/login', loginRouter.submit)
app.get('/logout', loginRouter.logout)
app.get('/post', entriesRouter.form)
app.post('/post',
 validate.required('entry[title]'),
 validate.lengthAbove('entry[title]', 4),
 entriesRouter.submit)
 // 放到所有路由最后
 app.get('/:page?', page(Entry.count, 5), entriesRouter.list)


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
