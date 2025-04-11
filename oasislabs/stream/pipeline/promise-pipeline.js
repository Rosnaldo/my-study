const fs = require("fs");
const stream = require("stream");
const util = require("util");

const pipeline = util.promisify(stream.pipeline);

const uppercase = new stream.Transform({
  transform(chunk, encoding, callback) {
    // Data processing
    callback(null, chunk.toString().toUpperCase());
  },
});

async function run() {
  await pipeline(
    fs.createReadStream("./hello.txt"),
    uppercase,
    fs.createWriteStream("./hello2.txt")
  );
  console.log("Pipeline succeeded.");
}

run().catch((err) => {
  console.error("Pipeline failed.", err);
});
