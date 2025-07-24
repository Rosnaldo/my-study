const express = require('express')
const app = express()
const os = require('os')
const hostname = os.hostname() || process.env.HOSTNAME

app.get('/', (req, res) => res.send('Hello from ' + hostname))
app.listen(8080, () => console.log('listeing on port 8080 on' + hostname))
