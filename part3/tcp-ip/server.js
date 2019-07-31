var net = require('net')

net.createServer(function(socket) {
  socket.write('Hello World!\r\n')
  socket.on('data', function(data) {
    console.log('got "data"', data)
  })
  socket.on('end', function() {
    console.log('socket has ended')
  })
  socket.on('close', function() {
    console.log('"close" event')
  })
  socket.on('error', function() {
    console.log('"error" event', e)
  })

  socket.pipe(socket)
}).listen(1337)

console.log('listening on port 1337')