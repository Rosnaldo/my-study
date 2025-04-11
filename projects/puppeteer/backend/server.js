const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const http = require('http').Server(app)
const io = require('socket.io')(http, {
    cors: {
      origin: 'http://localhost:5173'
    }
  })

const runCluster = require('./generate-pdf-cluster')
const mergePdf = require('./merge-pdf')

io.on('connection', (socket) => {
    console.log('Usuário conectado!', socket.id)
  
    socket.on('is-ready', () => {
      console.log('Received message', socket.id)
      io.emit('is-ready')
    })
  
    socket.on('disconnect', reason => {
      console.log('Usuário desconectado!', socket.id)
    })
  })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.get('/generate-pdf', async function(req, res) {
    await runCluster()
    await mergePdf()
	res.end()
})


app.get('/download-pdf', async function(req, res) {
    const read = fs.createReadStream(__dirname + '/result/merged.pdf')
	read.pipe(res)
})

const port = 3000

http.listen(port, () => console.log(`This app is listening on port ${port}`))
