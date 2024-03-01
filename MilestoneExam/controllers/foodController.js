const Food = require('../models/Food');

const createFood = async (req, res) => {
  const { id,name, description, price, image, category } = req.body;

  try {
    const newFood = new Food({
        id,
      name,
      description,
      price,
      image,
      category,
    });

    const savedFood = await newFood.save();
    res.status(201).json(savedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getFoodById = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateFood = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, image, category } = req.body;

  try {
    const updatedFood = await Food.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        image,
        category,
        updated_at: Date.now(),
      },
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteFood = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFood = await Food.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json({ message: 'Food item deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
};
