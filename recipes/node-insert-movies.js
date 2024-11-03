const fs = require("node:fs");
const { MongoClient, ServerApiVersion } = require("mongodb");
const client = new MongoClient(
  "mongodb://student:student@localhost:27017/vinci?authSource=admin",
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);
(async () => {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("movies");
    const data = JSON.parse(fs.readFileSync("./data/movies.json"));
    console.log("File read successfully:", data.length); // Affiche le nombre d'entrées
    await collection.insertMany(data);
    console.log("Data inserted successfully!");
  } catch (e) {
    console.log(e.message);
  } finally {
    await client.close();
  }
})();
