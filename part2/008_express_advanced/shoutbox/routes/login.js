const User = require('../lib/user')

exports.form = function(req, res) {
  res.render('login', { title: 'Login' })
}

exports.submit = function(req, res, next) {
  var data = req.body
  var username = data['user[name]']
  var userpass = data['user[pass]']
  //var data = req.body.user
  console.log(data)
  User.authenticate(username, userpass, function(err, user) {
    if (err) return next(err)
    if (user) {
      req.session.uid = user.id
      res.redirect('/')
    } else {
      res.error("Sorry! invalid credentials")
      res.redirect('back')
    }
  })
}

exports.logout = function(req, res) {
  console.log(req.session)
  req.session.destroy(function(err) {
    if (err) throw err
    res.redirect('/')
  })
}