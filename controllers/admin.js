const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; // always a string

  if (!editMode) {
    return res.redirect('/');
  }

  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect('/'); // not the best UX, normally you would want to return an error
    }

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const {
    productId,
    title: updatedTitle,
    price: updatedPrice,
    description: updatedDescription,
    imageUrl: updatedImageUrl,
  } = req.body;

  const updatedProduct = new Product(
    productId,
    updatedTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice
  );

  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: 'admin/products',
    });
  });
};
