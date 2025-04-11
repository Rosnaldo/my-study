const fs = require('fs')
const path = require('path')

const resultFile = path.join(__dirname, 'result.txt')
const thisFile = path.parse(__filename).base
const filterExecFiles = ['sync.js', 'promise.js', 'cb.js']

const removeFile = async (file) => {
  try {
    await fs.promises.unlink(file)
  } catch (err) {
    console.error(err)
  }
}

removeFile(resultFile)
  .then(async () => await fs.promises.readdir(__dirname))
  .then(async (files) => {
    const contents = await Promise.all(files
      .filter((f) => f !== thisFile)
      .filter((filename) => !filterExecFiles.includes(filename))
      .map((filename) => fs.promises.readFile(path.join(__dirname, filename)))
    )

    for await (const [index, content] of contents.entries()) {
      const contentToAppend = (index > 0) ? `\n${content}`: content 
      fs.promises.appendFile(resultFile, contentToAppend)
    }
  })
  .catch((err) => console.error(err))
