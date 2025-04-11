const fs = require('fs')
const path = require('path')

const resultFile = path.join(__dirname, 'result.txt')
const thisFile = path.parse(__filename).base
const filterExecFiles = ['sync.js', 'promise.js', 'cb.js']

fs.unlink(resultFile, () => {
  fs.readdir(__dirname, (_err, files) => {
    files.filter((f) => f !== thisFile)
    .filter((filename) => !filterExecFiles.includes(filename))
    .map((filename, index) => fs.readFile(path.join(__dirname, filename), (_err, content) => {
      const contentToAppend = (index > 0) ? `\n${content}`: content 
    fs.appendFile(resultFile, contentToAppend, () => {})
    }))
  })
})
