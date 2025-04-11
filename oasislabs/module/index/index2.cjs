'use strict'

console.log()
console.group('# package resolution')
console.log(`require('pino')`, '\t', ' =>', require.resolve('pino'))
console.log(`require('standard')`, '\t', ' =>', require.resolve('standard'))
console.groupEnd('')
console.log()

console.group('# file resolution')
console.log(`require('./format.js')`, '\t', ' =>', require.resolve('./format.js'))
console.groupEnd()
console.log()