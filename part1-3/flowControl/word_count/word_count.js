const fs = require('fs')
let completedTasks = 0
let tasks = []
let wordCounts = {}
const filesDir = './text'

function checkIfComplete() {
  completedTasks++
  if (completedTasks == tasks.length) {
    for (const index in wordCounts) {
      console.log(index + ': ' + wordCounts[index])
    }
  }
}

function countWordsInText(text) {
  const words = text.toString().toLowerCase().split(/\W+/).sort()
  for (const index in words) {
    const word = words[index]
    if (word) {
      wordCounts[word] = wordCounts[word] ? wordCounts[word] + 1 : 1
    }
  }
}

fs.readdir(filesDir, function(err, files) {
  if (err) throw err
  for (const index in files) {
    var task = (function(file) {
      return function() {
        fs.readFile(file, function(err, text) {
          if (err) throw err
          countWordsInText(text)
          checkIfComplete()
        })
      }
    })(filesDir + '/' + files[index])
    tasks.push(task)
  }
  for (var task in tasks) {
    tasks[task]()
  }
})