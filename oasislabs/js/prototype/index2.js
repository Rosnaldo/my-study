function Wolf (name) {
  this.name = name
}

function Dog (name) {
  Wolf.call(this, name + ' the dog')
}

Dog.prototype = Object.create(Wolf.prototype)
Dog.prototype.woof = function () {
  console.log(this.name + ': woof')
}
const wolf = new Dog('JO')
wolf.woof()
