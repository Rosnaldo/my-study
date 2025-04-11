const { Readable } = require('stream')

const createReadStream = () => {
  const data = ['some', 'data', 'to', 'read']
  return new Readable({
    objectMode: true,
    read () {
      if (data.length === 0) this.push(null)
      else this.push(data.pop())
    }
  })
}
const read = createReadStream()

// const read = Readable.from(['some', 'data', 'to', 'read'])

// read.on('data', (data) => { console.log(data) })
// read.on('end', () => { console.log('finished reading') })
