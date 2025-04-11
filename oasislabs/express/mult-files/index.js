const http = require('http')
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')

const forms = fs.readFileSync(path.join(__dirname, 'public', 'form.html'))

http.createServer((req, res) => {
    if (req.method === 'GET') {
        get(res)
        return
    }
    if (req.method === 'POST') {
        post(req, res)
        return
    }
    error(405, res)
}).listen(3000)

const get = (res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    res.end(forms)
}

const error = (code, res) => {
    res.statusCode = code
    res.end(http.STATUS_CODES[code])
}

const post = (req, res) => {
    if (!/multipart\/form-data/.test(req.headers['content-type'])) {
        error(415, res)
        return
    }

    const form = formidable({
        multiples: true,
        uploadDir: './uploads'
    })

    form.parse(req, (err, fields, files) => {
        if (err) return
        res.writeHead(200, {
            'Content-Type': 'application/json'
        })
        res.end(JSON.stringify({ fields, files }))
    })
}


