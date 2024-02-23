// middleware/authenticationMiddleware.js
const Author = require('../models/Author');

const authenticationMiddleware = async (req, res, next) => {
  // Check if the user ID is present in the cookie
  const userId = req.cookies.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized - User ID not provided' });
  }

  try {

    const author = await Author.findById(userId);

    if (!author) {
      return res.status(401).json({ error: 'Unauthorized - Invalid user ID' });
    }

    // Attach the user information to the request for later use in route handlers
    req.user = { id: author._id, username: author.username, subscribed: author.subscribed };
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = authenticationMiddleware;
