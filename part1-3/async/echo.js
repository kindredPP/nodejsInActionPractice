const net = require('net')

const server = net.createServer((socket) => {
  /* socket.on('data', (data) => {
    socket.write(data)
  }) */
  socket.once('data', (data) => { // 响应一次
    socket.write(data)
  })
})
server.listen(8888)