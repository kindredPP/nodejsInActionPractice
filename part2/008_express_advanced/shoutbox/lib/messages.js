const express = require('express')
const res = express.response

res.message = function(msg, type) {
  type = type || 'info'
  var sess = this.req.session
  console.log(sess)
  sess.messages = sess.messages || []
  sess.messages.push({ type: type, string: msg })
}

res.error = function(msg) {
  return this.message(msg, 'error')
}

module.exports = function(req, res, next) {
  console.log(req.session.messages)
  res.locals.messages = req.session.messages || []
  res.locals.removeMessages = function() {
    req.session.messages = []
  }
  next()
}