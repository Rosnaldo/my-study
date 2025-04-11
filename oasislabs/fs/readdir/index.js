const fs = require('fs')
const path = require('path')

fs.readdir(path.resolve('folder'), { withFileTypes: true }, (err, files) => {
    files.forEach(entry => {
        if (entry.isFile()) {
            console.log('isFile', entry)
            fs.stat(`./folder/${entry.name}`, (err, stats) => {
                console.log(`${entry.name} (${stats.size} bytes)`)
            })
        }
        if (entry.isDirectory()) {
            console.log('iSDirectory', entry)
        }
    })
})
