// controllers/searchController.js
const Blog = require('../models/Blog');

const searchController = {
  getSuggestions: async (req, res) => {
    try {
      const letter = req.params.letter;

      // Controller logic for providing blog post title suggestions based on the entered letter
      const suggestions = await Blog.find({
        title: { $regex: '^' + letter+'^', $options: 'i' },
      })//.select('title');

      res.json({ suggestions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = searchController;
