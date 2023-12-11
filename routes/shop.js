const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

// the ":" signify that productId can be anything
// the order matters if you have static routes with the same pattern
// the more specific route should come first
router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

// router.get('/orders', shopController.getOrders);

// router.post('/create-order', shopController.postOrder);

module.exports = router;
