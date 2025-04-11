'use strict'
const { Writable, Readable, Transform, pipeline } = require('stream')
const assert = require('assert')

const createWritable = () => {
  const sink = []
  const writable = new Writable({
    write(chunk, _encoding, next) {
      sink.push(chunk.toString())
      next()
    }
  })
  writable.sink = sink
  return writable
}

const writable = createWritable()
const transform = new Transform({
  transform(chunk, enc, next) {
    next(null, chunk.toString().toUpperCase())
  }
})

const redable = new Readable.from(['a', 'b', 'c'])

pipeline(
  redable,
  transform,
  writable,
  (err) => {
    if (err) console.log(err)
    assert.deepStrictEqual(writable.sink, ['A', 'B', 'C'])
  }
)
