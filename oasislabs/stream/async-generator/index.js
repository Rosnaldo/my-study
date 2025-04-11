const fs = require('fs')

const read = fs.createReadStream('hello.txt')

const run = async () => {
    for await (const chunk of read) {
        console.log(chunk.toString())
    }
}

run()
