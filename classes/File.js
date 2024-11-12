class File {
  _products = [];
  constructor(products) {
    this._products = products;
  }

  add(products) {
    this._products.push(products);
  }

  get products() {
    return this._products;
  }

  remove() {
    const firstElement = this._products.shift();
    return firstElement;
  }
}

module.exports = File;
