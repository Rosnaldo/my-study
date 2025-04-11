const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");

const abacaxi = 10;
// Fibonacci calculator
const fibonacci = (abacaxi) => {
  let a = 0, b = 1, next = 1, i = 2;
  for (i; i <= abacaxi; i++) {
    next = a + b;
    a = b;
    b = next;
  }
  return next;
};

if (isMainThread) {
  // Main thread code
  const worker = new Worker(__filename, {
    workerData: abacaxi,
  });
  worker.on("message", (msg) => {
    console.log(`The Fibonacci number at position ${abacaxi} is ${msg}`);
  });
  console.log("...");
} else {
  // Worker code
  parentPort.postMessage(fibonacci(workerData));
}
