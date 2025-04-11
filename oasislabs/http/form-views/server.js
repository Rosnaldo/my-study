const http = require('http')
const urlLib = require('url')
const fs = require('fs')

const formView = fs.readFileSync('./views/form.html')

const server = http.createServer((req, res) => {
    const { method, url } = req
    const { pathname, query } = urlLib.parse(url, true)

    if (method === 'GET') {
        if (pathname === '/form') {
            res.write(formView)
            res.statusCode = 200
        }
        else if (pathname === '/hello' && query.name) {
            res.write(formView)
            res.statusCode = 200
        } else {
            res.write('<h1>Error</h1>')
            res.statusCode = 404
        }
        return res.end()
    }
    if (method === 'POST' && pathname === '/hello') {
        let data = ''
        req.on('data', (chunk) => {
            data += chunk
        })
        req.on('end', (err) => {
            const body = JSON.parse(data)
            res.setHeader('content-type', 'application/json')
            res.write(`{"response": "hello ${body.name}"}`)
            res.statusCode = 200
            res.end()
        })
    }
})

server.listen(3000)