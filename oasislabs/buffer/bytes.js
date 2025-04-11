const assert = require('assert')

// 1 byte is a sequence of 8 bits
// 1 bit is a binary 0 or 1
// the value of bytes can be numbers between 0 and 225
// Buffer.from('a')[0] // first byte

// buffers are pre-fixed memory allocation

assert(Buffer.from('a')[0] === 'a'.charCodeAt(0))
assert(Buffer.from('a')[0] === 97)
assert(Buffer.from([97])[0] === 97)
assert(Buffer.from([97]).toString() === 'a')
assert(Buffer.alloc(1, 'a').toString() === Buffer.from('a').toString())

console.log(Buffer.from('abc').toJSON())  // { type: 'Buffer', data: [ 97, 98, 99 ] }

const bf = Buffer.from('a')

bf[0] = 98
bf.write('re') // writes only the maximum length

console.log(bf.toString())
