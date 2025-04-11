const { PassThrough, Writable, Readable } = require('stream')

const passThrough = new PassThrough()

// const outStream = new Writable({
//   write(chunk, encoding, callback) {
//     console.log(chunk.toString())
//     callback()
//   }
// })

const inStream = new Readable()

inStream.push("ABCDEFGHIJKLM")
inStream.push(null)

// process.stdin.pipe(passThrough).pipe(process.stdout)
inStream.pipe(process.stdout)
