const { Readable } = require('stream')

const inStream = new Readable({
  read() {
    this.push(String.fromCharCode(this.currentCharCode++))
    if (this.currentCharCode > 90) {
      this.push(null);
    }
  }
})

inStream.currentCharCode = 65

inStream.pipe(process.stdout)