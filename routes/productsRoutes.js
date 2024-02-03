const express = require('express');
const router = express.Router();
const ProductsController = require('../controllers/ProductsController');

// GET
router.get('/', ProductsController.getAllProducts);
router.get('/sections/:sectionName', ProductsController.getProductsBySection);
router.get('/:productId', ProductsController.getProduct);

// POST
router.post('/', ProductsController.newProduct);
router.post('/prices/:productId', ProductsController.addPrice);

// PUT
router.put('/prices/:priceId', ProductsController.updatePrice);
router.put('/:productId', ProductsController.updateProduct);

// DELETE
router.delete('/prices/:priceId', ProductsController.deleteProductPrice);
router.delete('/:productId', ProductsController.deleteProduct);

module.exports = router;