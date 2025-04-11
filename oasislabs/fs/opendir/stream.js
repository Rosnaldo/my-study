const { opendir } = require('node:fs')
const { createServer } = require('http')
const { Readable, Transform, pipeline } = require('stream')

const createEntryStream = () => {
  return new Transform({
    readableObjectMode: false,
    writableObjectMode: true,
    transform(entry, _enconding, next) {
      next(null, `\n ${entry.name}`)
    }
  })
}

;(async () => {
  createServer((req, res) => {
    opendir(__dirname, (_err, dir) => {
      const readable = Readable.from(dir)
      const entryStream = createEntryStream()
      pipeline(readable,entryStream, res, (err) => {
        if (err) {
          console.error('Errou!!!', err)
        }
      })
    })
  }).listen(3000)
})()
