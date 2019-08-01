var ansi = require('ansi')
var cursor = ansi(process.stdout)

console.log('\033[32mhello\033[39m')
console.log('world')
// colors.js clicolor ansi.js

cursor
  .fg.green()
  .write('Hello')
  .fg.reset()
  .write('\n')
cursor
  .bg.red()
  .write('World')
  .bg.reset()
  .write('\n')