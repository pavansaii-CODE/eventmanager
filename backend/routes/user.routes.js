const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const { verifyToken } = require('../middleware/authjwt');

/**
 * @route GET /api/users/profile
 * @desc Get current user's profile
 * @access Private (Client/Admin)
 */
router.get(
  '/profile',
  verifyToken, // Middleware to ensure user is logged in
  userController.getProfile
);

/**
 * @route PUT /api/users/profile
 * @desc Update current user's profile
 * @access Private (Client/Admin)
 */
router.put(
  '/profile',
  verifyToken, // Middleware to ensure user is logged in
  userController.updateProfile
);

module.exports = router;