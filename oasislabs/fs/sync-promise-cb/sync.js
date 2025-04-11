const path = require('path')
const fs = require('fs')

const resultFile = path.join(__dirname, 'result.txt')
const thisFile = path.parse(__filename).base
const filterExecFiles = ['sync.js', 'promise.js', 'cb.js']

try {
  fs.unlinkSync(resultFile)
} catch (err) {
  console.error(err)
} finally {
  const files = fs.readdirSync(__dirname)
  const contents =
    files.filter((f) => f !== thisFile)
    .filter((filename) => !filterExecFiles.includes(filename))
    .map((filename) => fs.readFileSync(path.join(__dirname, filename)))

  contents.forEach((content, index) => {
    const contentToAppend = (index > 0) ? `\n${content}`: content 
    fs.appendFileSync(resultFile, contentToAppend)
  })
}
