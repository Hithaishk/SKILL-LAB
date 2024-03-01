const User = require('../models/User');

const userController = {
  
  login: async (req, res) => {
    try {
      const {email, password } = req.body;
      const Userff = await User.findOne({ email, password });

      if (!Userff) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
      res.cookie('userId', Userff.id, { httpOnly: true });
      res.json({ message: 'Login successful.', User });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  
  register: async (req, res) => {
    try {
      const { id, username, email, password } = req.body;
      const existingUser = await User.findOne({ email });
      
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists.' });
      }
      const existingID = await User.findOne({ id });
      
      if (existingID) {
        return res.status(400).json({ error: 'Unique id required .' });
      }
      
      
      const newUser = await User.create({ id, username, email, password });
      res.json({ message: 'Registration successful.', User: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },


    getAllUsers: async (req, res) => {
      try {
        
        const users = await User.find();
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
 },

}
  

module.exports = userController;