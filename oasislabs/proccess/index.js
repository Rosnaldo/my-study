'use strict'
const os = require('os')

console.log('Current Directory', process.cwd())
console.log('Process Platform', process.platform)
console.log('Process ID', process.pid)

console.log('uptime', process.uptime())
console.log('cpuUsage', process.cpuUsage())
console.log('memoryUsage', process.memoryUsage())
console.log('freemem', os.freemem())
console.log('totalmem', os.totalmem())

console.log('Hostname', os.hostname())
console.log('Home dir', os.homedir())
console.log('Temp dir', os.tmpdir())
console.log('platform', os.platform())
console.log('type', os.type())
