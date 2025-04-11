const { Duplex } = require('stream')

const inoutStream = new Duplex({
  write(chunk, encoding, callback) {
    console.log('CHUNK', chunk.toString())
    callback()
  },

  read() {
    this.push(String.fromCharCode(this.currentCharCode++))
    console.log('currentCharCode', this.currentCharCode)
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  }
})

inoutStream.currentCharCode = 88

process.stdin.pipe(inoutStream).pipe(process.stdout)

