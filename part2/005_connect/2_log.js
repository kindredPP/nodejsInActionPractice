var connect = require('connect')
var app = connect()
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/plain')
  res.end('hello world')
})
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url)
  next() // 用回调函数，而不是从方法中返回，是为了可以在中间件组件里运行异步逻辑
})
app.listen(3000)