const timeout = setTimeout(() => {
  console.log('will not be logged')
}, 1000)

setImmediate(() => { clearTimeout(timeout) })