var User = require('../lib/user');

exports.form = function(req, res) {
  res.render('register', { title: 'Register' })
}
exports.submit = function(req, res) {
  var data = req.body;
  var username = data.user.name; //['user[name]']
  var userpass = data.user.pass; //['user[pass]']
  console.log(req.body)
  User.getByName(username, function(err, user) {
    if (err) return next(err)

    // redis will default it
    if (user.id) {
      res.error("Username already taken!")
      res.redirect('back')
    } else {
      user = new User({
        name: username,
        pass: userpass
      })
      user.save(function(err) {
        if (err) return next(err)
        req.session.uid = user.id
        res.redirect('/')
      })
    }
  })
}
