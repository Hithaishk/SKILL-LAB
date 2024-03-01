
const User = require('../models/User');

const authenticationMiddleware = async (req, res, next) => {
  const userId = req.cookies.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized - User ID not provided' });
  }

  try {

    const user = await User.findOne({ id: userId });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized - Invalid user ID' });
    }
    req.user = { id: user.id, username: user.username, email: user.email };
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = authenticationMiddleware;
