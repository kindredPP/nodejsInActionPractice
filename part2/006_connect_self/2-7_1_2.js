const connect = require('connect')
const bodyParser = require('body-parser')
const app = connect()
  .use(bodyParser.urlencoded({ extended: false }))
  .use(function(req, res) {
    res.end('Registered new user: ' + req.body.username)
  }).listen(3000)
  // curl -d username=111 http://localhost:3000 
  