const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  year: { type: Number, required: true },
  director: { type: String, required: true },
  rating: { type: Number, required: true },
  actors: [{ type: String }],
});

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
