const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const AGCT = ["A", "C", "G", "T"];

const setStream = (_req, res, next) => {
  res.set("Content-Type", "text/event-stream");
  res.set("Cache-Control: no-cache");
  next();
};

app.get("/adn", setStream, async (req, res) => {
  res.write(": ADN stream");

  setInterval(() => {
    res.write(`data: ${AGCT[Math.floor(Math.random() * AGCT.length)]}\n\n`);
  }, 1000);
});

app.listen(3001, () => {
  console.log("listen on port 3001");
});
