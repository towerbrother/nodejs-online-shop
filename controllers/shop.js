const Product = require('../models/product');
const Order = require('../models/order');

exports.getIndex = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.error(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.error(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products',
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.error(err));
};

exports.getCart = (req, res, next) => {
  const sessionUser = req.session.user;

  if (!sessionUser) {
    res.redirect('/login');
  }

  sessionUser
    .populate('cart.items.productId')
    .then((user) => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.error(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;

  Product.findById(prodId)
    .then((product) => {
      const sessionUser = req.session.user;

      if (!sessionUser) {
        res.redirect('/login');
      }

      return sessionUser.addToCart(product);
    })
    .then(() => res.redirect('/cart'));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const sessionUser = req.session.user;

  if (!sessionUser) {
    res.redirect('/login');
  }

  sessionUser
    .removeFromCart(prodId)
    .then(() => res.redirect('/cart'))
    .catch((err) => console.error(err));
};

exports.postOrder = (req, res, next) => {
  const sessionUser = req.session.user;

  if (!sessionUser) {
    res.redirect('/login');
  }

  sessionUser
    .populate('cart.items.productId')
    .then((user) => {
      const products = user.cart.items.map((i) => ({
        quantity: i.quantity,
        product: { ...i.productId._doc },
      }));

      const order = new Order({
        user: {
          name: sessionUser.name,
          userId: sessionUser,
        },
        products: products,
      });

      return order.save();
    })
    .then(() => sessionUser.clearCart())
    .then(() => res.redirect('/orders'))
    .catch((err) => console.error(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.session.user._id })
    .then((orders) => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
        isAuthenticated: req.session.isLoggedIn,
      });
    })
    .catch((err) => console.error(err));
};
