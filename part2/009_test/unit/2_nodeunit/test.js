exports.testPony = function(test) {
  var isPony = true
  test.ok(isPony, 'This is not a pony')
  test.done()
}

exports.testPony2 = function(test) {
  test.expect(2)
  if (false) {
    test.ok(false, 'This should not have passed.')
  }
  test.ok(true, 'This should have passed.')
  test.done()
}

//https://github.com/caolan/nodeunit 测试web程序
