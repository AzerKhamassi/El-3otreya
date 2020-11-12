const express = require('express');
const ordersController = require('../controllers/orders');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');

router.post('/', checkAuth, ordersController.createOrder);

router.get('/', ordersController.getAllOrders);

router.get('/byuser', checkAuth, ordersController.getOrdersbyUser);

router.get('/:orderId', ordersController.getOrder);

router.delete('/:orderId', checkAuth, ordersController.deleteOrder);

module.exports = router;
