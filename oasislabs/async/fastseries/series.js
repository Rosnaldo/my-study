const { readFile } = require('fs')
const series = require('fastseries')
const files = Array.from(Array(3)).fill(__filename)

const print = (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(Buffer.concat(data))
}

const readers = files.map((file) => {
  return (_, cb) => {
    readFile(file, (err, contents) => {
      if (err) cb(err)
      else cb(null, contents)
    })
  }
})

// const readers = files.map((file) => {
//   return (_, cb) => {
//     readFile(file, (err, contents) => {
//       if (err) {
//         print(err)
//         cb(null, Buffer.alloc(0))
//       } else cb(null, contents)
//     })
//   }
// })

series(null, readers, null, print)