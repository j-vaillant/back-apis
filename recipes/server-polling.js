const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

let finished = false;
let started = false;

const process = () => {
  setTimeout(() => {
    finished = true;
  }, 45000);
};

app.get("/poll", async (req, res) => {
  if (!started) {
    process();
    started = true;
    return res.json({ msg: "process begins...", success: false });
  }
  return !finished
    ? res.json({ msg: "process in progress...", success: false })
    : res.json({ msg: "process done !", success: true });
});

app.listen(3001, () => {
  console.log("listen on port 3001");
});
