const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log(`I received ${req.body.userName} as query string`);
  res.send("ok");
});

app.listen(3001, () => {
  console.log("listen on port 3001");
});
