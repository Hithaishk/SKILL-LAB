const Author = require('../models/Author');

const authController = {
  
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const author = await Author.findOne({ username, password });

      if (!author) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }

      // Set a cookie with the author's ID
      res.cookie('userId', author._id, { httpOnly: true });

      res.json({ message: 'Login successful.', author });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  register: async (req, res) => {
    try {
      const { username, password,subscribed } = req.body;
      const existingAuthor = await Author.findOne({ username });
      if (existingAuthor) {
        return res.status(400).json({ error: 'Username already exists.' });
      }
      const newAuthor = await Author.create({ username, password,subscribed });
      res.json({ message: 'Registration successful.', author: newAuthor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },


    getAllUsers: async (req, res) => {
      try {
        // Controller logic for fetching all users using Mongoose
        const users = await Author.find();
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  
    deleteUser: async (req, res) => {
      try {
        // Controller logic for deleting a user
        const userId = req.params.userId;
  
        // Check if the user exists
        const user = await Author.findById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        // Delete the user
        await Author.findByIdAndDelete(userId);
        
        res.json({ message: 'User deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  
    getUserById: async (req, res) => {
      try {
        // Controller logic for fetching a specific user based on the user's ID
        const userId = req.params.userId;
  
        // Use 'await User.findById(...)' for database queries
        const user = await Author.findById(userId);
  
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  
};

module.exports = authController;