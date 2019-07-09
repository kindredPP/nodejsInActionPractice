// 创建可配置的中间件-路由
const connect = require('connect')
var router = require('./middleware/router')

connect()
  .use(router(require('./routes/user')))
  .listen(3000)