// 创建可配置的中间件logger
const connect = require('connect')
// logger
function setup(format) {
  const regexp = /:(\w+)/g
  return function logger(req, res, next) {
    console.log(2) // 为什么 执行两次？？？
    const str = format.replace(regexp, function(match, property) {
      // console.log(property)
      console.log(match)
      return req[property]
    })
    console.log(str)
    next()
  }
}
// module.exports = setup
function hello(req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.end('hello world')
}
var app = connect()
  .use(setup(':method :url'))
  .use(hello)
  .listen(3000)