// buffer is a space in memory (RAM) that stores binary data

const assert = require('assert')

assert(Buffer.from('a') instanceof Buffer)
assert(Buffer.from('a') instanceof Uint8Array)

// ----------- allocation ----------------
const allocUnsafe = Buffer.allocUnsafe(10)

const alloc = Buffer.alloc(10)
for (const byte of alloc) assert.equal(byte, 0)
assert.equal(alloc.length, 10)

for (const b of alloc) {}

// ------------ encoding -----------------
const test = Buffer.from('test')
console.log(test)

const utf8 = Buffer.from('test').toString('utf8');
console.log('utf8', utf8);

const utf16le = Buffer.from('test').toString('utf16le');
console.log('utf16le', utf16le);

const latin1 = Buffer.from('test').toString('latin1');
console.log('latin1', latin1);

const base64 = Buffer.from('test').toString('base64');
const str = Buffer.from(base64, 'base64').toString();
console.log('base64', base64.toString());
assert(str === 'test')

const buf = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64')
console.log(buf.toString())

const hex = Buffer.from('test').toString('hex')
const test6 = Buffer.from(hex, 'hex')
console.log('hex', test6.toString())


// ------------ isBuffer -----------------

Buffer.isBuffer(Buffer.alloc(10)) // true
Buffer.isBuffer(Buffer.from('foo')) // true
Buffer.isBuffer('a string') // false
Buffer.isBuffer([]) // false
Buffer.isBuffer(new Uint8Array(1024)) // false

// ------------- decoder ------------------
const { StringDecoder } = require('string_decoder')

const decoder = new StringDecoder('utf8')
const cent = Buffer.from([0xC2, 0xA2])
console.log(decoder.write(cent))

const euro = Buffer.from([0xE2, 0x82, 0xAC])
console.log(decoder.write(euro))
