var Entry = require('../lib/entry')
exports.list = function(req, res, next) {
  var page = req.page
  Entry.getRange(page.from, page.to, function(err, entries) {
    if (err) return next(err)
    res.render('entries', {
      title: 'Entries',
      entries
    })
  })
}
exports.form = function(req, res) {
  res.render('post', {title: 'Post' })
}
exports.submit = function(req, res) {
  console.log(1111)
  var data = req.body
  console.log(data)
  var title = data.entry.title // ['entry[title]']
  var body = data.entry.body // ['entry[body]']
  var entry = new Entry({
    username: res.locals.user && res.locals.user.name,
    title,
    body
  })
  entry.save(function(err) {
    if (err) return next(err)
    if (req.remoteUser) {
      res.json({message: 'Entry added.'})
    } else {
      res.redirect('/')
    }
  })
}