const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('okay');
  });

server.listen(3000, () => {
    const getOptions = {
        host: '127.0.0.1',
        port: 3000,
        method: 'GET',
        path: '/hello?name=test',
    };
    
    console.log('GET request start');
    const getRequest = http.request(getOptions, (res) => {
        res.setEncoding('utf8');
    
        res.on('data', (data) => {
            console.log('data', data);
        });
        res.on('end', () => {
            console.log('GET request end');
        });
    });
    
    getRequest.on('error', (err) => {
        console.error(err);
    });
    getRequest.end();
    
    const postOptions = {
        host: '127.0.0.1',
        port: 3000,
        method: 'POST',
        path: '/hello',
    };
    
    console.log('POST request start');
    const postRequest = http.request(postOptions, (res) => {
        res.setEncoding('utf8');
        res.on('data', (data) => {
            console.log('data', data);
        });
        res.on('end', () => {
            console.log('POST request end');
        });
    });
    
    postRequest.on('error', (err) => {
        console.error(err);
    });
    postRequest.write(JSON.stringify({ name: 'my name' }));
    postRequest.end();
})
