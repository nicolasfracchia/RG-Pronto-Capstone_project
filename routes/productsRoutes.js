const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const ProductsController = require('../controllers/ProductsController');

// GET
router.get('/', ProductsController.getAllProducts);
router.get('/sections/:sectionName', ProductsController.getProductsBySection);
router.get('/:productId', ProductsController.getProduct);

// POST
router.post('/', verifyToken([1, 2]), ProductsController.newProduct);
router.post('/prices/:productId', verifyToken([1, 2]), ProductsController.addPrice);

// PUT
router.put('/prices/:priceId', verifyToken([1, 2]), ProductsController.updatePrice);
router.put('/:productId', verifyToken([1, 2]), ProductsController.updateProduct);

// DELETE
router.delete('/prices/:priceId', verifyToken([1, 2]), ProductsController.deleteProductPrice);
router.delete('/:productId', verifyToken([1, 2]), ProductsController.deleteProduct);

module.exports = router;