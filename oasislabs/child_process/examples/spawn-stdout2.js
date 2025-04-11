'use strict'
const { spawn } = require('child_process')
const sp = spawn(
  process.execPath,
  [
   '-e',
   `console.error('err output'); process.stdin.pipe(process.stdout)`
  ],
  // { stdio: ['pipe', 'pipe', 'pipe'] }
  // { stdio: ['pipe', 'pipe', process.stdout] }
  { stdio: ['pipe', 'inherit', 'ignore'] }
)

// sp.stdout.pipe(process.stdout)
// sp.stderr.pipe(process.stdout)
sp.stdin.write('this input will become output\n')
sp.stdin.end()
