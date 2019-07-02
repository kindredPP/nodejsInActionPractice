var mongodb = require('mongodb')
var server = new mongodb.Server('127.0.0.1', 27017, {})
var client = new mongodb.Db('mydatabase', server, {w: 1})

client.open(function(err) {
  if (err) throw err
  client.collection('test_collection', (err, collection) => {
    if (err) throw err
    console.log('We are now able to perform queries')
  })

})