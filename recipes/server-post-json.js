const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//prevent CORS issues
const allow = (_req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allow);

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
