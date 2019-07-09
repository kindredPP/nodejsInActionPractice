// 创建可配置的中间件-重写url
const connect = require('connect')
const url = require('url')
const app = connect()
  .use(rewrite)
  //.use(showPost)
  .listen(3000)

const path = url.parse(req.url).pathname
function rewrite () {
  // todo 需要db支持
}
/**
 * 这些例子传达了一个重要信息，在构建中间件时，你应该 关注那些小型的、可配置的部分。
 * 构建大量微小的、模块化的、可重用的中间件组件， 合起来搭成你的程序。
 * 保持中间件的小型化和专注性真的有助于将复杂的程序逻辑分解 成更小的组成部分。
 */