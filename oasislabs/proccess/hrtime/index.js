const fs = require('fs');

function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile(__dirname + '/planets.txt', callback);
}

const timeoutScheduled = process.hrtime()[1] ;
console.log('timeoutScheduled', timeoutScheduled)

someAsyncOperation((err, data) => {
  console.log('1 : ', process.hrtime()[1]  - timeoutScheduled)
});

someAsyncOperation((err, data) => {
  console.log('2 : ',process.hrtime()[1]  - timeoutScheduled)
});

someAsyncOperation((err, data) => {
  console.log('3 : ', process.hrtime()[1]  - timeoutScheduled)
});

someAsyncOperation((err, data) => {
  console.log('4 : ', process.hrtime()[1]  - timeoutScheduled)
});

someAsyncOperation((err, data) => {
  console.log('5 : ', process.hrtime()[1]  - timeoutScheduled)
});

someAsyncOperation((err, data) => {
  console.log('6 : ', process.hrtime()[1]  - timeoutScheduled)
});

someAsyncOperation((err, data) => {
  console.log('7 : ', process.hrtime()[1]  - timeoutScheduled)
});

someAsyncOperation((err, data) => {
  console.log('8 : ', process.hrtime()[1]  - timeoutScheduled)
});

someAsyncOperation((err, data) => {
  console.log('9 : ', process.hrtime()[1]  - timeoutScheduled)
});
