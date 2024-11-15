const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  login: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  role: { type: String },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
