const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const ProductsController = require('../controllers/ProductsController');

// PRODUCT IMAGE UPLOAD
const multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/products')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

// GET
router.get('/', ProductsController.getAllProducts);
router.get('/sections/:sectionName', ProductsController.getProductsBySection);
router.get('/:productId', ProductsController.getProduct);

// POST
router.post('/', [verifyToken([1, 2]), upload.single('product_image')], ProductsController.newProduct);
router.post('/prices/:productId', verifyToken([1, 2]), ProductsController.addPrice);

// PUT
router.put('/prices/:priceId', verifyToken([1, 2]), ProductsController.updatePrice);
router.put('/:productId', verifyToken([1, 2]), ProductsController.updateProduct);

// DELETE
router.delete('/prices/:priceId', verifyToken([1, 2]), ProductsController.deleteProductPrice);
router.delete('/:productId', verifyToken([1, 2]), ProductsController.deleteProduct);

module.exports = router;