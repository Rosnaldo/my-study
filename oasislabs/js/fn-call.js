const obj = { id: 99, fn: function()  { console.log(this.id) } }
const obj2 = { id: 2, fn: obj.fn }

obj.fn() // 99
obj2.fn() // 2

const fn = function () { console.log(this.id) }
fn.call(obj) // 99
fn.call(obj2) // 2

// const fn = function () { this.id = 3; console.log(this.id) }
// fn.call(obj) // 3
// fn.call(obj2) // 3

// const fn = () => { console.log(this.id) }
// fn.call(obj) // undefined

const fn1 = function() {
  return (offset) => { console.log(this.id + offset) }
}
const offset = fn1.call(obj)
offset(1)

const normalFunction = function () {}
const fatArrowFunction = () => {}
console.log(typeof normalFunction.prototype === 'object')
console.log(typeof fatArrowFunction.prototype === 'undefined')

