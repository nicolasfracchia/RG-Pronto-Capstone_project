const express = require('express');
const router = express.Router();
const OrdersStatusController = require('../controllers/OrdersStatusController');

// GET
router.get('/', OrdersStatusController.getAllOrdersStatus);
router.get('/:osId', OrdersStatusController.getOrdersStatus);

// POST
router.post('/', OrdersStatusController.newOrdersStatus);

// PUT
router.put('/:osId', OrdersStatusController.updateOrdersStatus);

// DELETE
router.delete('/:osId', OrdersStatusController.deleteOrdersStatus);

module.exports = router;