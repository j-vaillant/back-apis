const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { open } = require("node:fs/promises");

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

app.post("/csv", upload.single("file"), async (req, res) => {
  const path = req.file.path;
  let count = 0;
  const json = {
    data: [],
  };

  try {
    const openHandler = await open(path, "r");

    for await (let line of openHandler.readLines()) {
      //skip first line (headers)
      if (count === 0) {
        count++;
        continue;
      }
      const columns = line.split(",");

      json.data[count - 1] = {
        firstName: columns[0],
        lastName: columns[1],
        birthDate: columns[2],
      };

      count++;
    }

    res.json(json).end();
  } catch (e) {
    res.json({ error: e.message });
  }
});

app.listen(3001, () => {
  console.log("listen on port 3001");
});
