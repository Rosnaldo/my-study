const { spawn } = require('child_process')

const grep = spawn('grep', ['ssh'])

grep.on('close', (code, signal) => {
  console.log(`child process terminated due to receipt of signal ${signal}`)
})

grep.kill('SIGTERM')
