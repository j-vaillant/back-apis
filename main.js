const express = require("express");
const multer = require("multer");
const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const sharp = require("sharp");
const cors = require("cors");

const app = express();
const port = 3001;

// Configuration de multer pour l'upload des fichiers
const upload = multer({ dest: "uploads/" });
const classes = JSON.parse(fs.readFileSync("./utils/ia/classes.json", "utf8"));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Charger le modèle TensorFlow
let model;
(async () => {
  console.log("Chargement du modèle...");
  model = await tf.loadLayersModel("file://./utils/ia/model/model.json");
  console.log("Modèle chargé.");
})();

// Prétraitement de l'image
const preprocessImage = async (filePath) => {
  const buffer = await sharp(filePath)
    .resize(128, 128) // Taille de l'image
    .toBuffer();

  const tensor = tf.node
    .decodeImage(buffer)
    .expandDims(0) // Ajouter une dimension pour le batch
    .toFloat()
    .div(tf.scalar(255.0)); // Normalisation
  return tensor;
};

// Route pour prédire l'image
app.post("/predict", upload.single("image"), async (req, res) => {
  if (!model) {
    return res.status(503).send("Modèle non chargé.");
  }

  const filePath = req.file.path;

  try {
    const tensor = await preprocessImage(filePath);
    const predictions = model.predict(tensor);
    const scores = predictions.dataSync();
    const results = classes.map((name, index) => ({
      class: name,
      score: scores[index],
    }));

    // Nettoyage après traitement
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      results: results.sort((a, b) => b.score - a.score), // Trier par score décroissant
    });
  } catch (err) {
    console.error("Erreur pendant la prédiction:", err);
    res.status(500).send("Erreur lors de la prédiction.");
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`API disponible sur http://localhost:${port}`);
});
