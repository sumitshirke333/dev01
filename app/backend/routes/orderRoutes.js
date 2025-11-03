const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// --- POST /api/orders (create order) ---
router.post('/', async (req, res) => {
  try {
    const { orderId, items, total, shippingDetails } = req.body;
    if (!orderId || !items || !total || !shippingDetails) {
      return res.status(400).json({ msg: 'Please include all fields' });
    }
    const newOrder = new Order({ orderId, items, total, shippingDetails });
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// --- GET /api/orders (get all orders) ---
// GET /api/orders - get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find(); // get all orders
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
