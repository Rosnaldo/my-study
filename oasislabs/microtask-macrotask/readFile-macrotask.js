const fs = require('fs')

fs.readFile(__filename, () => {
  console.log('read 1')
  process.nextTick(() => {
    console.log('nextTick 1')
  })

  Promise.resolve()
    .then(() => console.log('promise 1'))
})

fs.readFile(__filename, () => {
  console.log('read 2')
  process.nextTick(() => {
    console.log('nextTick 2')
  })

  Promise.resolve()
    .then(() => console.log('promise 2'))
})