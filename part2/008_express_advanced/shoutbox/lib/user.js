const redis = require('redis')
const bcrypt = require('bcrypt')
const db = redis.createClient()

module.exports = User

function User(obj) {
  for( var key in obj) {
    this[key] = obj[key]
  }
}

User.prototype.save = function(fn) {
  if (this.id) {
    this.update(fn)
  } else {
    const user = this
    db.incr('user:ids', function(err, id){
      if (err) return fn(err)
      user.id = id
      user.hashPassword(function(err) {
        if (err) return fn(err)
        user.update(fn)
      })
    })
  }
}

User.prototype.update = function(fn) {
  var user = this
  const id = user.id
  db.set('user:id:' + user.name, id, function(err) {
    if (err) return fn(err)
    let updateUser = {} 
    // 为了去掉原型链上的方法，重新组织一个User对象；旧版redis是0.7.2无此问题
    for (let i in user) {
      if(user.hasOwnProperty(i)) { // 非原型链
        updateUser[i] = user[i]
      }
    }
    db.hmset('user:' + id, updateUser, function(err) {
      fn(err)
    })
  })
}

User.prototype.hashPassword = function(fn) {
  const user = this
  // 生成 12个字符的盐
  bcrypt.genSalt(12, function(err, salt) {
    if (err) return fn(err)
    user.salt = salt
    bcrypt.hash(user.pass, salt, function(err, hash) {
      if (err) return fn(err)
      user.pass = hash
      fn()
    })
  })
}
User.getByName = function(name, fn) {
  User.getId(name, function(err, id) {
    if (err) return fn(err)
    User.get(id, fn)
  })
}
User.getId = function(name, fn) {
  db.get('user:id:' + name, fn)
}
User.get = function(id, fn) {
  db.hgetall('user:' + id, function(err, user) {
    if (err) return fn(err)
    fn(null, new User(user))
  })
}
User.authenticate = function(name, pass, fn) {
  User.getByName(name, function(err, user) {
    if (err) return fn(err)
    if (!user.id) return fn()
    bcrypt.hash(pass, user.salt, function(err, hash) {
      if (err) return fn(err)
      if (hash == user.pass) return fn(null, user)
      fn()
    })
  })
}
/* var tobi = new User({
  name: 'Tobi',
  pass: 'im a ferret',
  age: '2'
})

tobi.save(function(err) {
  if (err) throw err;
  console.log('user id %d', tobi.id)
}) */