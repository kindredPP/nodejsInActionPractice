var https = require('https')
var formidable = require('formidable')
var fs = require('fs')

var options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./key-cert.pem')
}
// https
var server = https.createServer(options, (req, res) => {
  switch (req.method) {
    case 'GET':
      show(req, res)
      break
    case 'POST':
      upload(req, res)
      break
    default:
      badRequest(res)
  }
})

server.listen(3000)

function show(req, res) {
  var html = '<html><head><title>Upload</title></head><body>'
           + '<h1>Upload</h1>'
           + '<form method="post" action="/" enctype="multipart/form-data">'
           + '<p><input type="text" name="name" /></p>'
           + '<p><input type="file" name="file" /></p>'
           + '<p><input type="submit" value="Upload" /></p>'
           + '</form></body></html>'
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Content-Length', Buffer.byteLength(html))
  res.end(html)
}
function badRequest(res) {
  res.statusCode = 400
  res.setHeader('Content-Type', 'text/plain')
  res.end('Bad Request')
}
function upload(req, res) {
  if(!isFormData(req)) {
    res.statusCode = 400
    res.end('Bad Request: expecting multipart/form-data')
    return
  }
  var form = new formidable.IncomingForm()
  form.uploadDir = __dirname + '/tmp'
  form.on('field', (field, value) => {
    console.log(1)
    console.log(field)
    console.log(2)
    console.log(value)
  })
  form.on('file', (name, value) => {
    console.log(3)
    console.log(name)
    console.log(4)
    console.log(value)
  })
  form.on('progress', (bytesReceived, bytesExpected) => {
    var percent = Math.floor(bytesReceived / bytesExpected * 100)
    console.log(percent)
  })
  form.on('end', () => {
    res.end('upload complete')
  })
  form.parse(req)
}
function isFormData(req) {
  var type = req.headers['content-type'] || ''
  return 0 == type.indexOf('multipart/form-data')
}

