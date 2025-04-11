const assert = require('assert')
const add = require('../add')

assert.strictEqual(add(2, 2), 4)
assert.strict.equal(add(2, 2), 4)
assert.throws(() => add('5', '5'), Error('inputs must be numbers'))
assert.doesNotThrow(() => add(5, 5))
