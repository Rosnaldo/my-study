'use strict'
const { readdirSync, statSync } = require('fs')

const files = readdirSync('.')

for (const name of files) {
  const stat = statSync(name)
  const typeLabel = stat.isDirectory() ? 'dir: ' : 'file: '
  const { atime, birthtime, ctime, mtime } = stat
  console.group(typeLabel, name)
  console.log('atime:', atime.toLocaleString())  // access time
  console.log('ctime:', ctime.toLocaleString())  // change time (write and status change ownership or permissions)
  console.log('mtime:', mtime.toLocaleString())  // modified time (only write)
  console.log('birthtime:', birthtime.toLocaleString())  // birth time
  console.groupEnd()
  console.log()
}
