const { ObjectId } = require('mongodb');
const { getDb } = require('../util/database');

const COLLECTION = 'products';
class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new ObjectId(id) : null; // id is an optional argument
  }

  save() {
    const db = getDb();
    let dbOperation;

    if (this._id) {
      dbOperation = db
        .collection(COLLECTION)
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOperation = db.collection(COLLECTION).insertOne(this);
    }
    return dbOperation
      .then((result) => console.log(result))
      .catch((err) => console.error(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection(COLLECTION)
      .find()
      .toArray() // toArray() to be used only for small amount of items (alternative is pagination)
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => console.error(err));
  }

  static findById(productId) {
    const db = getDb();
    return db
      .collection(COLLECTION)
      .find({ _id: new ObjectId(productId) })
      .next() // mogoDb will still return a cursor and therefore I need to select the file (that I know is unique)
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => console.error(err));
  }

  static deleteById(productId) {
    const db = getDb();

    if (productId) {
      return db
        .collection(COLLECTION)
        .deleteOne({ _id: new ObjectId(productId) })
        .then(() => console.log(`Deleted product with id: ${productId}!`))
        .catch((err) => console.error(err));
    }
  }
}

module.exports = Product;
