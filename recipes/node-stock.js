const fs = require("node:fs");
const process = require("node:process");
const readline = require("node:readline/promises");
const Pile = require("./classes/Pile");
const File = require("./classes/File");


process.on("exit", () => {
  console.log("Bye.");
});

process.on("SIGINT", () => {
  console.log("Process Interrupted, exiting");
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const genProduct = (lastId) => {
  return { id: lastId + 1, description: `Produit${lastId + 1}` };
};

const save = (products) => {
  const data = {
    stock: {
      products,
    },
  };
  fs.writeFileSync("./data/stock.json", JSON.stringify(data, null, 2));
};

const run = async () => {
  const data = JSON.parse(fs.readFileSync("./data/stock.json"));
  const stockMode = process.env.STOCK_MODE;
  const lastProduct = data.stock.products[data.stock.products.length - 1];
  const lastId = lastProduct.id;
  const stock =
    stockMode === "FIFO"
      ? new Pile(data.stock.products)
      : new File(data.stock.products);

  console.log(`${data.stock.products.length} produit(s) chargés`);

  console.log("1) Ajouter un produit");
  console.log("2) Sortir un produit");
  console.log("3) Quitter");

  const action = await rl.question("Que voulez-vous faire ? ");

  if (action === "1") {
    stock.add(genProduct(lastId));
  }

  if (action === "2") {
    stock.remove();
  }

  if (action === "3") {
    process.exitCode = 1;
  }

  console.log("taille du nouveau stock:", stock.products.length);

  try {
    save(stock.products);
  } catch (e) {
    console.log(e);
  } finally {
    console.log("enregistrement réussi !");
    setTimeout(() => {
      if (process.exitCode !== 1) {
        console.clear();
        run();
      } else {
      }
    }, 1500);
  }
};

(() => {
  run();
})();
