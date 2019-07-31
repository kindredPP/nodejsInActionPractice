var net = require('net')
var socket = net.connect({ 
  host: 'localhost', //process.argv[2], 
  port: 1337
})
socket.setEncoding('utf8')

socket.on('connect', function() {
  socket.write('HELO local.domain.name\r\n')
})

socket.once('data', function(chunk) {
  console.log('SSH server version: %j', chunk.trim())
  socket.end()
})
socket.on('close', function() {
  console.log('client disconnected')
})
// node client.js localhost // 配合server.js