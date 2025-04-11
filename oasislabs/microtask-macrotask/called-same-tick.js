const fs = require('fs/promises')

const read = async (name) => {
  process.nextTick(() => console.log('next', name))
  const content = await fs.readFile(__filename)
  console.log(name)
}

// Promise.all([
//   read('1'),
//   read('2'),
//   read('3')
// ])

// ;(async () => {
//   const opA = read('A')
//   const opB = read('B')
//   const opC = read('C')

//   opA.then(() => {})
//   opB.then(() => {})
//   opC.then(() => {})

//   await opA
//   await opB
//   await opC
// })()
