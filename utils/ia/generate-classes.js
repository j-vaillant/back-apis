const fs = require("fs");
const path = require("path");

const trainDir = "./Training"; // Chemin vers votre dossier train
const outputPath = "./classes.json"; // Fichier pour sauvegarder les classes

(async () => {
  try {
    // Lire les sous-dossiers dans le répertoire train
    const classes = fs
      .readdirSync(trainDir)
      .filter((item) => fs.statSync(path.join(trainDir, item)).isDirectory());

    console.log("Classes détectées :", classes);

    // Sauvegarder les classes dans un fichier JSON
    fs.writeFileSync(outputPath, JSON.stringify(classes, null, 2), "utf8");
    console.log(`Classes sauvegardées dans ${outputPath}`);
  } catch (err) {
    console.error("Erreur lors de la création des classes :", err.message);
  }
})();
