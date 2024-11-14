const express = require("express");
const app = express();
const { connectToDatabase } = require("./utils/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const Movie = require("./models/Movie");

require("dotenv").config();

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

connectToDatabase();

app.post("/db", async (req, res) => {
  try {
    const select = JSON.parse(req.body.requests.select);
    const insert = JSON.parse(req.body.requests.insert);
    const requestType = req.body.requestType;

    let update = {};
    let movies = [];
    let results = {};

    if (requestType === "select") {
      movies = await Movie.find(select);
    }

    if (requestType === "insert") {
      results = await Movie.create(insert);
    }

    if (requestType === "delete") {
      results = await Movie.deleteOne(select);
    }

    if (requestType === "update") {
      update = JSON.parse(req.body.requests.update);
      results = await Movie.updateOne(select, update);
    }

    return res.json({ movies, results });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.listen(3001, () => {
  console.log("listen on port 3001");
});
