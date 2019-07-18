const Photo = require('../models/Photo')
const path = require('path')
const fs = require('fs')
const join = path.join

let photos = []
/* photos.push({
  name: 'Node.js logo',
  path: 'https://nodejs.org/static/images/logos/nodejs-green.png'
})
photos.push({
  name: 'Ryan Speaking',
  path: 'https://nodejs.org/static/apple-touch-icon.png'
}) */

exports.list = function(req, res) {
  Photo.find({}, function(err, photos) {
    if (err) return next(err)
    res.render('photos', {
      title: 'Photos',
      photos: photos
    })
  })
}
exports.form = function(req, res) {
  res.render('photos/upload', {
    title: 'Photo upload'
  })
}
exports.submit = function(dir) {
  return function(req, res, next) {
    // 获取文件 'photo[image]'为控件name
    const img = req.files['photo[image]'];
    // name input
    const name = req.body['photo[name]'] || img.name;
    const path = join(dir, img.name)
    if (Object.keys(req.files).length == 0) {
      return res.status(400).send('No files were uploaded.');
    }
    img.mv(path, function(err) {
      if (err) return next(err);
      Photo.create({
        name: name,
        path: img.name
      }, function(err) {
        if (err) return next(err);
        res.redirect('/');
      })
    })
  }
}

exports.download = function(dir) {
  return function(req, res, next) {
    const id = req.params.id
    Photo.findById(id, function(err, photo) {
      if (err) return next(err)
      const path = join(dir, photo.path)
      // res.sendfile(path) // 下载后，浏览器内全屏显示
      res.download(path, photo.name)
    })
  }
}