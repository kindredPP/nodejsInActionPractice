var connect = require('connect')
var app = connect()
app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url)
  next()
})
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/plain')
  res.end('hello world')
})
app.listen(3000)