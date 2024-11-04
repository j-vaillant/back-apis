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

app.post("/", (req, res) => {
  console.log(req.body);
  res.send({});
});

app.listen(3001, () => {
  console.log("listen on port 3001");
});
