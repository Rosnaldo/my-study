const fs = require("fs");
const file = "./hello.txt";

fs.chmodSync(file, 0o664);
