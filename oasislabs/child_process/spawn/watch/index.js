'use strict'
const fs = require('fs')
const { spawn } = require('child_process')
const filename = 'test'

fs.watch(filename, () => {
  const ls = spawn('ls', ['-lh', filename])
  ls.stdout.pipe(process.stdout)
})
