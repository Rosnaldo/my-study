const { opendir } = require('fs')

opendir('./', (err, dir) => {
  dir.read()
  .then(dirent => console.log(dirent.name))
  .then(() => dir.close())
  // console.log(dir.readSync())
  // dir.closeSync()
})
