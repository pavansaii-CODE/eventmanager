const jwt = require('jsonwebtoken');

// --- Configuration ---
// Make sure this matches the secret used in auth.controller.js
const JWT_SECRET = '23rmjngtfjerjkfiurki'; 

// --- 1. Verify Token Middleware ---
// This runs on every protected route. It verifies the token and adds user info to req.user
exports.verifyToken = (req, res, next) => {
  // 1. Check for token in the 'x-auth-token' header
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // 2. Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // 3. Attach the decoded user payload to the request object (req.user)
    // The decoded payload contains { user: { id: '...', role: '...' } }
    req.user = decoded.user;
    next(); // Move to the next middleware or the controller
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// --- 2. Check Role Middleware (Client) ---
// This runs after verifyToken to ensure the user is a client
exports.isClient = (req, res, next) => {
  if (req.user.role === 'client') {
    next();
  } else {
    res.status(403).json({
      msg: 'Require Client Role!'
    });
  }
};

// --- 3. Check Role Middleware (Admin) ---
// This runs after verifyToken to ensure the user is an admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({
      msg: 'Require Admin Role!'
    });
  }
};