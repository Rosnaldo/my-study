const { nextTick } = require('node:process');

;(async () => {
  process.nextTick(() => console.log(1));
  console.log(0);
  setImmediate(() => console.log(4));
  queueMicrotask(() => console.log(3));
  Promise.resolve().then(() => console.log(2));
  setTimeout(() => console.log(5));
  setImmediate(() => console.log(4));
  await new Promise((resolve) => {
    // console.log('await',0)
    // process.nextTick(() => console.log('await',1));
    // setImmediate(() => console.log('await',4));
    // queueMicrotask(() => console.log('await',3));
    // Promise.resolve().then(() => console.log('await',2));
    // setTimeout(() => console.log('await',5));
    resolve()
  })
  setTimeout(() => console.log(5));
  console.log(0)
  queueMicrotask(() => console.log(3));
  Promise.resolve().then(() => console.log(2));
  console.log(0)
  process.nextTick(() => console.log(1));
  setImmediate(() => console.log(4));
  Promise.resolve().then(() => console.log(2));
  setImmediate(() => console.log(4));
  console.log(0)
})()