const { ObjectId } = require('mongodb');
const { getDb } = require('../util/database');

class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart || { items: [] };
    this._id = id;
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this);
  }

  getCart = async () => {
    const db = getDb();
    try {
      const productIds = this.cart.items.map((item) => item.productId);

      const products = await db
        .collection('products')
        .find({ _id: { $in: productIds } })
        .toArray();

      return products.map((product) => {
        const { quantity } = this.cart.items.find(
          (item) => item.productId.toString() === product._id.toString()
        );

        return { ...product, quantity };
      });
    } catch (err) {
      console.error(err);
    }
  };

  addToCart(product) {
    let cartProductIndex, updatedCartItems;

    try {
      cartProductIndex = this.cart.items.findIndex(
        (item) => item.productId.toString() === product._id.toString()
      );
      updatedCartItems = [...this.cart.items];
    } catch {
      cartProductIndex = -1;
      updatedCartItems = [];
    }

    let newQuantity = 1;
    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };

    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  static findById(userId) {
    const db = getDb();
    return db.collection('users').findOne({ _id: new ObjectId(userId) });
  }
}

module.exports = User;
