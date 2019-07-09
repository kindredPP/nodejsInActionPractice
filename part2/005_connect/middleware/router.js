var parse = require('url').parse
module.exports = function route(obj) {
  return function(req, res, next) {
    if (!obj[req.method]) {
      next()
      return
    }
    const routes = obj[req.method]
    const url = parse(req.url)
    const paths = Object.keys(routes)

    for (var i = 0; i < paths.length; i++) {
      var path = paths[i]
      var fn = routes[path]
      console.log(path)
      path = path
              .replace(/\//g, '\\/') // 将/替换为正则用的\/
              .replace(/:(\w+)/g, '([^\\/]+)') // 将:w（数字、字母、特殊符号）替换为([^\/]+)除了/以外的其他任何
      console.log(path)
      // 构造正则表达式
      var re = new RegExp('^' + path + '$')
      var captures = url.pathname.match(re)
      if (captures) {
        var args = [req, res].concat(captures.slice(1))
        fn.apply(null, args)
        return
      }
    }
    next()
  }
}