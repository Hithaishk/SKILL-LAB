const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  food_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  order_id: {
    type: String,
    required: true,
    unique: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'delivered'],
    default: 'pending'
  },
  // Additional fields like user address ID and payment mode can be added here
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
