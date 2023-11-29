const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;

// const fs = require('fs');
// const path = require('path');

// const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

// module.exports = class Cart {
//   static addProduct(id, price) {
//     // fetch previous cart
//     fs.readFile(p, (err, fileContent) => {
//       let cart = { products: [], totalPrice: 0 };
//       if (!err) {
//         cart = JSON.parse(fileContent);
//       }

//       // analyse the cart content checking for same product
//       const existingProductIndex = cart.products.findIndex(
//         (product) => product.id === id
//       );
//       const existingProduct = cart.products[existingProductIndex];

//       let updatedProduct;
//       // add new product / increase quantity
//       if (existingProduct) {
//         updatedProduct = { ...existingProduct, qty: existingProduct.qty + 1 };
//         cart.products = [...cart.products];
//         cart.products[existingProductIndex] = updatedProduct;
//       } else {
//         updatedProduct = { id, qty: 1 };
//         cart.products.push(updatedProduct);
//       }

//       // increase cart total price
//       cart.totalPrice = cart.totalPrice + +price;

//       // save new cart in file
//       fs.writeFile(p, JSON.stringify(cart), (err) => {
//         console.log(err);
//       });
//     });
//   }

//   static deleteProduct(id, productPrice) {
//     fs.readFile(p, (err, fileContent) => {
//       if (err) {
//         return;
//       }
//       const updatedCart = { ...JSON.parse(fileContent) };
//       const product = updatedCart.products.find((prod) => prod.id === id);
//       if (!product) {
//         return;
//       }
//       const productQty = product.qty;
//       updatedCart.products = updatedCart.products.filter(
//         (prod) => prod.id !== id
//       );
//       updatedCart.totalPrice =
//         updatedCart.totalPrice - productPrice * productQty;

//       fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
//         console.log(err);
//       });
//     });
//   }

//   static getCart(cb) {
//     fs.readFile(p, (err, fileContent) => {
//       const cart = JSON.parse(fileContent);
//       if (err) {
//         cb(null);
//       } else {
//         cb(cart);
//       }
//     });
//   }
// };
