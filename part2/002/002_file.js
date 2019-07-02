var http = require('http')
var parse = require('url').parse
var join = require('path').join
var fs = require('fs')

var root = __dirname
console.log(root)
var server = http.createServer((req, res) => {
  var url = parse(req.url)
  var path = join(root, url.pathname)

 /*  var stream = fs.createReadStream(path)
  stream.on('data', (chunk) => {
    res.write(chunk)
  })
  stream.on('end', () => {
    res.end()
  }) */
  var stream = fs.createReadStream(path)
  // var writeStream = fs.createWriteStream('./copy.txt')
  // stream.pipe(writeStream)
  stream.pipe(res)
  stream.on('error', err => {
    res.statusCode = 500
    res.end('Internal Server Error\n')
  })
})
server.listen(3000)