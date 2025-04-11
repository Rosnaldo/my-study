const { Readable, Transform } = require('stream')

const commaSplitter = new Transform({
  readableObjectMode: true,

  transform(chunk, _encoding, callback) {
    this.push(
      chunk
        .toString()
        .trim()
        .split(',')
    )
    callback()
  }
})

const arrayToObject = new Transform({
  readableObjectMode: true,
  writableObjectMode: true,
  transform(chunk, _encoding, callback) {
    const obj = {}
    for (let i = 0; i < chunk.length; i += 2) {
      obj[chunk[i]] = chunk[i + 1]
    }
    this.push(obj)
    callback()
  }
})

const objectToString = new Transform({
  writableObjectMode: true,
  transform(chunk, _encoding, callback) {
    this.push(JSON.stringify(chunk) + '\n')
    callback()
  }
})

Readable.from('da, do, de, di')
  .pipe(commaSplitter)
  .pipe(arrayToObject)
  .pipe(objectToString)
  .pipe(process.stdout)