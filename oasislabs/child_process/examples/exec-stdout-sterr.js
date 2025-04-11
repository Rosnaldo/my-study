'use strict'
const { exec } = require('child_process')
// ends with exit code 0
// exec(
//   `"${process.execPath}" -e "console.log('A');console.error('B')"`,
//   (err, stdout, sterr) => {
//     console.log('err: ', err)
//     console.log('subprocess stdout: ', stdout.toString())
//     console.log('subporcess stderr: ', sterr.toString())
//   }
// )

// ends with exit code 1
exec(
  `"${process.execPath}" -e "console.log('A'); throw Error('B')"`,
  (err, stdout, sterr) => {
    console.log('err: ', err)
    console.log('subprocess stdout: ', stdout.toString())
    console.log('subporcess stderr: ', sterr.toString())
  }
)