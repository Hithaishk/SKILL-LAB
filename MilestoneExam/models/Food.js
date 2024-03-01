const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique:true
      },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['veg', 'non-veg', 'dessert'],
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
