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
  const request = JSON.parse(req.body.request);

  try {
    const movies = await Movie.find(request);

    res.json(movies);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.listen(3001, () => {
  console.log("listen on port 3001");
});
