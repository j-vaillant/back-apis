const { pipeline } = require("node:stream/promises");
const { Transform } = require("node:stream");
const { createReadStream, createWriteStream } = require("node:fs");

const readStream = createReadStream("file.txt", { encoding: "utf-8" });
const writableStream = createWriteStream("file2.txt");

const transformer = new Transform({
  transform(chunk, _encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  },
});

(async () => {
  await pipeline(readStream, transformer, writableStream);
})();
