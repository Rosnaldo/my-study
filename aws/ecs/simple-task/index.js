// index.js
console.log("Hello from ECS Node.js task!");

// Example: simulate work
setTimeout(() => {
  console.log("Task finished!");
  process.exit(0);
}, 5000);
