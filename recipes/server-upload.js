const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

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

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.file);
  console.log(req.body);
  res.send("Fichier téléchargé avec succès !");
});

app.listen(3001, () => {
  console.log("listen on port 3001");
});
