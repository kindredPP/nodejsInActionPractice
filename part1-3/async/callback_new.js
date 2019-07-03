const http = require('http')
const fs = require('fs')

http.createServer(function(req, res) {
  if (req.url == '/') {
    getTitles(res)
  }
}).listen(8001, '127.0.0.1')

function getTitles(res) {
  fs.readFile('./titles.json', (err, data) => {
    if (err) return hadError(err, res)
    const titles = JSON.parse(data.toString())
    getTemplate(titles, res)
    
  })
}
function getTemplate(titles, res) {
  fs.readFile('./template.html', (err, data) => {
    if (err) return hadError(err, res)

    var tmpl = data.toString()
    var html = tmpl.replace('%', titles.join('</li><li>'))
    res.writeHead(200, {'Content-Type' : 'text/html'})
    res.end(html)
  })
}
function hadError(err, res) {
  console.log(err)
  res.end('Server error')
}
// 尽早返回 减少if else