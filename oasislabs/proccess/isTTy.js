console.log(process.stdin.isTTY ? 'terminal' : 'piped to')
process.stderr.write(process.stdin.isTTY ? 'terminal\n' : 'piped to\n')