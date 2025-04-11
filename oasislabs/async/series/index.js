const func = async (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name)
      return resolve(name)
    }, 1000)
  })
}

// const result = [
//   'p1',
//   'p2',
//   'p3'
// ].reduce((acc, name) => {
//     acc = acc.then(() => func(name))
//     return acc
// }, Promise.resolve())
// .catch(console.error)

;(async () => {
  console.time()

  func('p1')
    .then(() => func('p2'))
    .then(() => func('p3'))
    .then(() => func('p4'))

  console.timeEnd()
})()
