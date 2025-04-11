const { readdirSync, statSync } = require('fs')

const files = readdirSync(__dirname + '/..')

for (const name of files) {
  const stat = statSync(__dirname + '/../' +name)
  const typeName = stat.isDirectory() ? 'dir' : 'file'
  console.log(typeName, name)
}
