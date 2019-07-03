const EventEmitter = require('events').EventEmitter
var channel = new EventEmitter()
channel.on('join', () => {
  console.log('Welcome!')
})

channel.emit('join')