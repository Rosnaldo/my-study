const { readdirSync, readdir } = require('fs')
const { readdir: readdirProm } = require('fs').promises

readdir(__dirname, (err, files) => {
  console.log('async: ', files)
})

const files = readdirSync(__dirname)
console.log('sync: ', files)

async function run() {
  const files = await readdirProm(__dirname)
  return files
}

run()
.then((files) => console.log('promises: ', files))
.catch((err) => console.log(err))
