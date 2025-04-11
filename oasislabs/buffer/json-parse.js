const assert = require('assert')
const buffer = Buffer.from('👀')

const jsonS = JSON.stringify(buffer)

const json = JSON.parse(jsonS)

const newBuffer = Buffer.from(json.data)

assert(Buffer.compare(buffer, newBuffer) === 0)
