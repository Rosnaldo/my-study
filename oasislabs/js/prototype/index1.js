const assert = require('assert')

const leopard = {
  hiss: function () { console.log('hiss') } 
}

const lynx = Object.create(leopard, {
  purr: { value: function () { console.log('purr') } }
})

const cat = Object.create(lynx, {
  meow: { value: function () { console.log('meow') } }
})


const felix = cat //TODO replace null with instantiation of a cat
felix.meow() // prints Felix the cat: meow
felix.purr() // prints Felix the cat: prrr
felix.hiss() // prints Felix the cat: hsss

// prototype checks, do not remove
const felixProto = Object.getPrototypeOf(felix)
const felixProtoProto = Object.getPrototypeOf(felixProto)
const felixProtoProtoProto = Object.getPrototypeOf(felixProtoProto)

assert.equal(felixProto, lynx)
assert.equal(felixProtoProto, leopard)
assert.deepEqual(felixProtoProtoProto, Object.prototype)

assert.equal(Object.getOwnPropertyNames(felix).length, 1)
assert.equal(Object.getOwnPropertyNames(felixProto).length, 1)
assert.equal(Object.getOwnPropertyNames(felixProtoProto).length, 1)

assert.equal(typeof felix.meow, 'function')
assert.equal(typeof felixProto.purr, 'function')
assert.equal(typeof felixProtoProto.hiss, 'function')
console.log('prototype checks passed!')
