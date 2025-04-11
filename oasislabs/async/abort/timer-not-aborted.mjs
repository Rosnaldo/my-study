import { setTimeout } from 'timers/promises'

const timeout = setTimeout(1000, 'will be logged')

setImmediate(() => {
  clearTimeout(timeout) // do not do this, it won't work
})

console.log(await timeout)