const fs = require('fs')
const fsPromises = fs.promises

fs.watch('./watched', (eventType, filename) => {
  console.log('eventType: ', eventType)
  console.log('filename: ', filename)
})

setTimeout(() => {
  fsPromises.writeFile('./watched/hello.txt', 'hello')
  .then(() => fsPromises.rename('./watched/hello.txt', './watched/hello2.txt'))
  .then(() => fsPromises.unlink('./watched/hello2.txt'))
}, 100)

// fs.watchFile('hello.txt', (current, previous) => {
//     console.log('current: ', current)
//     console.log('previous: ', previous)
// })
