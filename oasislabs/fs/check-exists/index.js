const fs = require('fs')

fs.open('hello.txt', (err, file) => {
    if (err) {
        console.log(err)
    }
    file.read('hello.txt', (err, readed) => console.log(readed))
})
