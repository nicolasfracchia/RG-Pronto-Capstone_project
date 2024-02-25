const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const OrdersController = require('../controllers/OrdersController');

// GET
router.get('/type/:type', verifyToken([1,2,3]), OrdersController.getOrdersByType);
//router.get('/:osId', OrdersStatusController.getOrdersStatus);

// POST
router.post('/', verifyToken([1,2,3]), OrdersController.newOrder);

// PUT
//router.put('/:osId', verifyToken([1]), OrdersStatusController.updateOrdersStatus);

// DELETE
//router.delete('/:osId', verifyToken([1]), OrdersStatusController.deleteOrdersStatus);

module.exports = router;