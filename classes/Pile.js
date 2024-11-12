class Pile {
  _products = [];
  constructor(products) {
    this._products = products;
  }

  add(product) {
    this._products.push(product);
  }

  get products() {
    return this._products;
  }

  remove() {
    const lastElement = this._products.pop();
    return lastElement;
  }
}

module.exports = Pile;
