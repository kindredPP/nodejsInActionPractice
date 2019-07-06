var http = require('http')
var parse = require('url').parse
var join = require('path').join
var fs = require('fs')

var root = __dirname // 该文件所在目录的路径
var server = http.createServer((req, res) => {
  var url = parse(req.url)
  var path = join(root, url.pathname)
  // 先发制人的错误处理
  fs.stat(path, (err, stat) => {
    if (err) {
      // 文件不存在 ENOENT
      if ('ENOENT' == err.code) {
        res.statusCode = 404
        res.end('Not Found\n')
      } else {
        res.statusCode = 500
        res.end('Internal Server Error\n')
      }
    } else {
      res.setHeader('Content-Length', stat.size)
      var stream = fs.createReadStream(path)
      stream.pipe(res)
      stream.on('error', err => {
        res.statusCode = 500
        res.end('Internal Server Error\n')
      })
    }
  })

})
server.listen(3000)