const fs = require('fs')
const path = require('path')

const cwd = path.resolve('.')

;(async () => {
  const files = new Set(fs.readdirSync(cwd))
  fs.watch(cwd, (event, filename) => {
    try {
      const { ctimeMs, mtimeMs } = fs.statSync(path.join(__dirname, filename))
      if (!files.has(filename)) {
        event = 'created'
        files.add(filename)
      } else {
        if (ctimeMs === mtimeMs) event = 'content-updated'
        else event = 'status-updated'
      }
    } catch (err) {
      if (err.code === 'ENOENT') {
        files.delete(filename)
        event = 'deleted'
      } else {
        console.error(err)
      }
    } finally {
      console.log(event, filename)
    }
  })
})()
