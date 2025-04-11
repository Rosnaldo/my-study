const { fork } = require('child_process')
const path = require('path')

const child = fork(path.join(__dirname, 'child/child'))

child.send('message')
