node -e "fs.writeFileSync('test', 'test')"
node -e "fs.mkdirSync('test-dir')"
node -e "fs.chmodSync('test-dir', 0o6444)"
