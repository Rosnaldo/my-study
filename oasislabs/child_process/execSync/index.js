const { execSync } = require('child_process')

const result = execSync(
  `"${process.execPath}" -e "console.error('subprocess stdin output')"`
)
console.log(result.toString())
