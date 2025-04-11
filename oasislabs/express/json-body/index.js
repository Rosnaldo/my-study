const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send({ message: 'Hello World' })
})

app.post('/', function (req, res) {
  res.setHeader('Content-Type', 'application/json')

  res.send(req.body)
})


app.listen(3000)
