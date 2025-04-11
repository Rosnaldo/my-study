const fs = require('fs')

fs.unlinkSync('linked.txt')
fs.symlinkSync('hello.txt', 'linked.txt')
console.log(fs.lstatSync('linked.txt'))