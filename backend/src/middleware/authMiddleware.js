const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Note: Changed to capital 'U' in User

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized' });
      return;  // Add return to prevent further execution
    }
  } else {
    // Move this inside the else block
    res.status(401).json({ message: 'Not authorized, no token' });
    return;  // Add return to prevent further execution
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as admin' });
    return;
  }
};

module.exports = { protect, admin };