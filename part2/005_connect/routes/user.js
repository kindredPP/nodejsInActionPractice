var routes = {
  GET: {
    '/users': function(req, res) {
      res.end('tobi, loki, ferret')
    },
    '/user/:id': function(req, res, id) {
      res.end('user ' + id)
    }
  }
}

module.exports = routes