'use strict'
const assert = require('assert')
const { parse, basename, dirname, extname, resolve, normalize, isAbsolute } = require('path')
console.log('filename parsed:', parse(__filename))
console.log('filename basename:', basename(__filename))
console.log('filename dirname:', dirname(__filename))
console.log('filename extname:', extname(__filename))

console.log('Resolve',  resolve(__dirname, 'test','test.txt'))
console.log('Normalize', normalize(`${__dirname}/../../test/test.txt`))
console.log('Is Absolute', isAbsolute(__filename))

assert(__dirname === resolve('.'))
assert(__dirname === process.cwd())
