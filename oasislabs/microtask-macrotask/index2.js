console.log('script start')

process.nextTick(() => {
  console.log('nextTick')
})

const interval = setInterval(() => {
  process.nextTick(() => {
    console.log('nextTick setInterval')
  })

  console.log('setInterval')

  Promise.resolve()
    .then(() => console.log('setInterval promise 1'))
    .then(() => console.log('setInterval promise 2'))
  clearInterval(interval)
}, 0)

setTimeout(() => {
  process.nextTick(() => {
    console.log('nextTick setTimeout')
  })
  console.log('setTimeout 1')

  Promise.resolve()
    .then(() => console.log('promise 3'))
    .then(() => console.log('promise 4'))
    .then(() => {
      setTimeout(() => {
        console.log('setTimeout 2')
        Promise.resolve().then(() => console.log('promise 5'))
          .then(() => console.log('promise 6'))
      }, 0)
    })
}, 0)

Promise.resolve()
  .then(() => console.log('promise 1'))
  .then(() => console.log('promise 2'))
  .then(() => Promise.resolve()
    .then(() => console.log('promise 2.1'))
    .then(() => console.log('promise 2.2'))
  )
