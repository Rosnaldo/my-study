const WebSocket = require('ws')

const ws = new WebSocket.Server({
    port: 3000
})

ws.on('connection', (socket) => {
    socket.on('message', (msg) => {
        console.log('Received: ', msg)
        if (msg === 'Hello') socket.send('World')
    })
})
