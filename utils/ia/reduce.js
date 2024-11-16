const fs = require("fs");
const path = require("path");

// Chemin vers le dossier des données de test
const testDir = "./Training"; // Remplacez par le chemin réel
const filesToKeep = 30; // Nombre de fichiers à conserver par classe

// Fonction principale
(async () => {
  try {
    // Parcourir les sous-dossiers (classes)
    const classes = fs.readdirSync(testDir).filter((item) => {
      const fullPath = path.join(testDir, item);
      return fs.statSync(fullPath).isDirectory(); // Vérifie que c'est un dossier
    });

    for (const className of classes) {
      const classDir = path.join(testDir, className);

      // Lister tous les fichiers dans la classe
      const files = fs.readdirSync(classDir).filter((file) => {
        const filePath = path.join(classDir, file);
        return fs.statSync(filePath).isFile(); // Vérifie que c'est un fichier
      });

      console.log(`Classe ${className}: ${files.length} fichiers trouvés.`);

      // Si plus de fichiers que la limite, supprimer l'excès
      if (files.length > filesToKeep) {
        const filesToDelete = files.slice(filesToKeep); // Conserver les 15 premiers
        for (const file of filesToDelete) {
          const filePath = path.join(classDir, file);
          fs.unlinkSync(filePath); // Supprime le fichier
          console.log(`Supprimé : ${filePath}`);
        }
      }
    }

    console.log("Réduction des fichiers de test terminée.");
  } catch (error) {
    console.error("Erreur lors de la réduction des fichiers :", error.message);
  }
})();
