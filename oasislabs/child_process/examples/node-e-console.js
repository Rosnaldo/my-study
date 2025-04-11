const { execSync } = require('child_process')

const output = execSync(
  `node -e "console.log('Hello world')"`
)
console.log(output.toString())