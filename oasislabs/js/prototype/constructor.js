class Wolf {
  constructor (name) {
    this.name = name
  }
  howl () { console.log(this.name + ': awoooooo') }
}

class Dog extends Wolf {
  constructor (name) {
    super (name + ' the dog')
  }
  woof () { console.log(this.name + ': woof') }
}

const rufus = new Dog('rufus')
rufus.woof()
rufus.howl()

console.log(Object.getPrototypeOf(rufus) === Dog.prototype)
console.log(Object.getPrototypeOf(Dog.prototype) === Wolf.prototype)
