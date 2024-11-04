const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb://student:student@localhost:27017/vinci?authSource=admin";

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log("Connecté à MongoDB avec Mongoose");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB:", error);
    process.exit(1); // Quitte le processus en cas d'échec de connexion
  }
}

module.exports.connectToDatabase = connectToDatabase;
