const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://jva:${process.env.DB_PWD}@scriptgames.y9ccz.mongodb.net/?retryWrites=true&w=majority&appName=scriptgames`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

require("dotenv").config();

const allow = (_req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allow);

app.get("/", (req, res) => {
  try {
    const collection = db.collection("movies");
    const data = JSON.parse(fs.readFileSync("./data/movies.json"));
    collection.insertMany(data);
  } catch {}

  res.status(201).json({ message: "Abonnement reçu avec succès." });
});

app.listen(3001, () => {
  console.log("listen on port 3001");
});
