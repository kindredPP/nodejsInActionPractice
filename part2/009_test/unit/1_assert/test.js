var assert = require('assert')
var Todo = require('./index')
var todo = new Todo()
var testsCompleted = 0

function deleteTest() {
  todo.add('Delete me')
  assert.equal(todo.getCount(), 1, '1 item should exist')
  todo.deleteAll()
  assert.equal(todo.getCount(), 0 , 'No item should exist')
  testsCompleted++
}

function addTest() {
  todo.deleteAll()
  todo.add('Added')
  assert.notEqual(todo.getCount(), 0, '1 item should exist')
  testsCompleted++
}
function doAsyncTest(cb) {
  todo.doAsync(function(value) {
    assert.ok(value, 'Callback should be passed true')
    testsCompleted++
    cb()
  })
}
function throwTest() {
  assert.throws(todo.add, /requires/)
  testsCompleted++
}

deleteTest()
addTest()
throwTest()
doAsyncTest(function(){
  console.log('Completed ' + testsCompleted + ' tests')
})