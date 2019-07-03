const EventEmitter = require('events').EventEmitter
const net = require('net')

let channel = new EventEmitter()
channel.clients = {}
channel.subscriptions = {}
channel.setMaxListeners(50)
channel.on('join', function(id, client) {
  var welcome = 'Welcome!\n' + 'Guests online: ' + this.listeners('broadcast').length
  client.write(welcome + "\n")

  this.clients[id] = client
  this.subscriptions[id] = function(senderId, message) {
    // console.log(senderId, message)
    if (id != senderId) {
      // console.log('message:' + message)
      this.clients[id].write(message)
    }
  }
  this.on('broadcast', this.subscriptions[id])
})
channel.on('leave', function(id) {
  channel.removeListener('broadcast', this.subscriptions[id])
  channel.emit('broadcast', id, id+ ' has left the chat.\n')
})

channel.on('shutdown', function() {
  channel.emit('broadcast', '', 'Chat has shut down.\n')
  channel.removeAllListeners('broadcast')
})

const server = net.createServer(function(client) {
  const id = client.remoteAddress + ":" + client.remotePort
  channel.emit('join', id, client)


  // connection事件不起作用
  client.on('connection', function() {
    console.log('有用户已连接') 
  })
  client.on('data', function(data) {
    data = data.toString()
    
    if (data == 'shutdown\r\n') {
      channel.emit('shutdown')
    }
    channel.emit('broadcast', id, data)
  })
  client.on('close', function() {
    channel.emit('leave', id)
  })
})

server.listen(8888)