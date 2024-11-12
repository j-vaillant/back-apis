const express = require("express");
const app = express();
const port = 3000;

const books = require("./data/books.json");

const router = express.Router();

router.get("/", (_req, res) => {
  const rand = Math.floor(Math.random() * books.length);
  if (books[rand]) {
    res.json(books[rand]);
  }
});

router.get("/:index", (req, res) => {
  const index = req.params.index;

  if (books[index]) {
    return res.json(books[index]);
  } else {
    res.status(500).send("invalid index given");
  }
});

app.use("/api/book", router);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
