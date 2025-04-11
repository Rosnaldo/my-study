const net = require('net')

net.createServer((socket) => {
 const interval = setInterval(() => {
  socket.write('beat')
 })
 socket.on('data', (data) => {
  socket.write(data.toString(data.toUpperCase()))
 })
 socket.on('end', () => { clearInterval(interval) })
}).listen(3000)
