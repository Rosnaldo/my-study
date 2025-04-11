const fs = require('fs')
const { Transform, pipeline } = require('stream')

const transform = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase())
        callback()
    }
})

pipeline(
    fs.createReadStream('hello3.txt'),
    transform,
    fs.createWriteStream('hello2.txt'),
    (err) => {
        if (err) {
            console.log(err)            
        } else {
            console.log('Pipeline succeded')
        }
    }
)