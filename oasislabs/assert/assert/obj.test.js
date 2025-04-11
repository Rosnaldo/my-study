const assert = require('assert')

const obj = {
  id: 1,
  name: { first: 'David', second: 'Clements' }
}

assert.strict.deepEqual(obj, {
  id: 1,
  name: { first: 'David', second: 'Clements' }
})
