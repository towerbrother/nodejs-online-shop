const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// these routes follow this path structure - /admin/[path]
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

router.post('/add-product', adminController.postAddProduct);

module.exports = router;
