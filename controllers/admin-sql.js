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
  /**
   * Having set a "hasMany" reletionship between User and Product
   * Sequelize automatically creates this static method for creating products
   */
  req.user
    .createProduct({ title, price, imageUrl, description })
    .then(() => {
      console.log('Product created!');
      res.redirect('/admin/products');
    })
    .catch((err) => console.error(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; // always a string

  if (!editMode) {
    return res.redirect('/');
  }

  const productId = req.params.productId;
  req.user
    .getProducts({ where: { id: productId } })
    // Product.findByPk(productId)
    .then((products) => {
      if (!products || products.length === 0) {
        return res.redirect('/'); // best would be error handling
      }

      const product = products[0];

      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product,
      });
    })
    .catch((err) => console.error(err));
};

exports.postEditProduct = (req, res, next) => {
  const {
    productId,
    title: updatedTitle,
    price: updatedPrice,
    description: updatedDescription,
    imageUrl: updatedImageUrl,
  } = req.body;

  Product.findByPk(productId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDescription;
      product.imageUrl = updatedImageUrl;
      return product.save();
    })
    .then(() => {
      console.log('Updated product!');
      res.redirect('/admin/products');
    })
    .catch((err) => console.error(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then(() => {
      console.log(`Deleted product with id: ${productId}!`);
      res.redirect('/admin/products');
    })
    .catch((err) => console.error(err));
};

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: 'admin/products',
      });
    })
    .catch((err) => console.error(err));
};
