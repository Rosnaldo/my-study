let bar

function funcWithCb (callback) {
  callback()
}

function funcQueueMicrostask(callback) {
  queueMicrotask(callback)
}

funcWithCb(() => {
  console.log('bar', bar)
})

funcQueueMicrostask(() => {
  console.log('bar', bar)
})

bar = 1