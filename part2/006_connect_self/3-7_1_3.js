const connect = require('connect')
const bodyParser = require('body-parser')
const app = connect()
  .use(bodyParser.urlencoded({ limit: '100kb', extended: false}))
  .use(function(req, res) {
    res.end('hello')
  })
  .listen(3000)