const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const path = require("path");

// Configuration
const imageSize = 128;
const numClasses = 10; // Remplacez par le nombre réel de fruits dans vos données
const TRAIN_LIMIT = 1000;
const TEST_LIMIT = 1000;

// Chargement des données
async function loadDataset(dataDir) {
  const classes = fs.readdirSync(dataDir).filter((item) => {
    const fullPath = path.join(dataDir, item);
    return fs.statSync(fullPath).isDirectory();
  });

  const imagePaths = [];
  const labels = [];

  classes.forEach((className, index) => {
    const classDir = path.join(dataDir, className);
    const files = fs
      .readdirSync(classDir)
      .filter((file) => file !== ".DS_Store"); // Filtrer les fichiers inutiles

    files.forEach((file) => {
      imagePaths.push(path.join(classDir, file));
      labels.push(index); // Indexer les labels selon la classe
    });
  });

  return { imagePaths, labels, classes };
}

// Prétraitement des images
async function preprocessImage(imagePath) {
  const buffer = fs.readFileSync(imagePath);
  const tensor = tf.node
    .decodeImage(buffer)
    .resizeNearestNeighbor([imageSize, imageSize]) // Redimensionnement
    .toFloat()
    .div(tf.scalar(255.0)); // Normalisation
  return tensor;
}

// Création des tensors pour l'entraînement
async function createDataset(imagePaths, labels) {
  const xs = [];
  const ys = [];

  for (let i = 0; i < imagePaths.length; i++) {
    const image = await preprocessImage(imagePaths[i]);
    xs.push(image);
    ys.push(labels[i]);
  }

  return {
    xs: tf.stack(xs), // Empile les tensors d’images
    ys: tf.oneHot(tf.tensor1d(ys, "int32"), numClasses), // Encodage one-hot des labels
  };
}

// Définir le modèle
function createModel() {
  const model = tf.sequential();

  // Convolutions
  model.add(
    tf.layers.conv2d({
      inputShape: [imageSize, imageSize, 3],
      filters: 32,
      kernelSize: 3,
      activation: "relu",
    })
  );
  model.add(tf.layers.maxPooling2d({ poolSize: 2 }));

  model.add(
    tf.layers.conv2d({ filters: 64, kernelSize: 3, activation: "relu" })
  );
  model.add(tf.layers.maxPooling2d({ poolSize: 2 }));

  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({ units: 128, activation: "relu" }));
  model.add(tf.layers.dense({ units: numClasses, activation: "softmax" }));

  model.compile({
    optimizer: "adam",
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"],
  });

  return model;
}

// Entraîner le modèle
async function trainModel() {
  const dataDir = "./Training";
  const testDir = "./Test";

  console.log("Chargement des données...");
  const { imagePaths, labels, classes } = await loadDataset(dataDir);
  const { xs, ys } = await createDataset(imagePaths, labels);

  const model = createModel();

  console.log("Entraînement du modèle...");
  await model.fit(xs, ys, {
    epochs: 10,
    validationSplit: 0.2,
    batchSize: 32,
  });

  // Sauvegarder le modèle
  await model.save(`file://./model`);
  console.log("Modèle sauvegardé.");

  // Évaluer sur le test set
  const { imagePaths: testPaths, labels: testLabels } =
    await loadDataset(testDir);
  const { xs: testXs, ys: testYs } = await createDataset(testPaths, testLabels);

  const evalResult = model.evaluate(testXs, testYs);
  evalResult.forEach((res, i) =>
    console.log(`${model.metricsNames[i]}: ${res}`)
  );
}

trainModel();
