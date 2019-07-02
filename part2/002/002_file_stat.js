var http = require('http')
var parse = require('url').parse
var join = require('path').join
var fs = require('fs')

var root = __dirname
console.log(root)
var server = http.createServer((req, res) => {
  var url = parse(req.url)
  var path = join(root, url.pathname)

  fs.stat(path, (err, stat) => {
    if (err) {
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