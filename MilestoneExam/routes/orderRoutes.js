const express = require('express');
const orderController = require('../controllers/orderController'); // Adjust the path as needed
const authenticationMiddleware = require('../middleWares/authenticationMiddleware');

const router = express.Router();

// Get all orders
router.get('/',authenticationMiddleware, orderController.getAllOrders);

// Get order by ID
router.get('/orders/:id',authenticationMiddleware, orderController.getOrderById);

// Create a new order
router.post('/',authenticationMiddleware, orderController.createOrder);

// Update an order by ID
router.put('/orders/:id',authenticationMiddleware, orderController.updateOrder);

// Delete an order by ID
router.delete('/orders/:id',authenticationMiddleware, orderController.deleteOrder);

router.delete('/sndOTP',authenticationMiddleware, orderController.sendOTP);


module.exports = router;
