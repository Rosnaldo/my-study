const { Readable } = require('stream')

function *generate () {
  yield "Node.js";
  yield "is";
  yield "a";
  yield "JavaScript";
  yield "Runtime";
}

const read = Readable.from(generate())

read.on('data', (data) => console.log(data.toString()))
