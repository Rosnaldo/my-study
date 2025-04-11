const express = require('express')

const app = express()

app.get('/', function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  // res.write('<html>')
  // res.write('<body>')
  // res.write('<h1>Hello, World!</h1>')
  // res.write('</body>')
  // res.write('</html>')
  // res.end()

  res.send('Hello World')
})

app.listen(3000)
