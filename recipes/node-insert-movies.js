const fs = require("node:fs");
const { connectToDatabase } = require("../utils/db");
const Movie = require("../models/Movie");
const { default: mongoose } = require("mongoose");
(async () => {
  try {
    await connectToDatabase();
    const data = JSON.parse(fs.readFileSync("./data/movies.json"));
    console.log("File read successfully:", data.length); // Affiche le nombre d'entrées
    await Movie.insertMany(data);
    console.log("Data inserted successfully!");
  } catch (e) {
    console.log(e.message);
  } finally {
    mongoose.disconnect();
  }
})();
