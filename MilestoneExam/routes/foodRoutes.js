const express = require('express');
const foodController = require('../controllers/foodController'); // Adjust the path as needed
const authenticationMiddleware = require('../middleWares/authenticationMiddleware');

const router = express.Router();

// Get all food items
router.get('/',authenticationMiddleware, foodController.getAllFoods);

// Get food item by ID
router.get('/foods/:id',authenticationMiddleware, foodController.getFoodById);

// Create a new food item
router.post('/', authenticationMiddleware,foodController.createFood);

// Update a food item by ID
router.put('/foods/:id',authenticationMiddleware, foodController.updateFood);

// Delete a food item by ID
router.delete('/foods/:id',authenticationMiddleware, foodController.deleteFood);


module.exports = router;
