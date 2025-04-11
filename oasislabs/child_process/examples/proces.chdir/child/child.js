const { execSync } = require('child_process')

process.on('message', () => {
  console.log(process.cwd())
  process.chdir('./child')
  const result = execSync('ls')
  console.log(result.toString())
})
