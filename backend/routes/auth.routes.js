const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const { registerValidation, loginValidation, validate } = require('../middleware/validator');

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post(
  '/register',
  registerValidation, // 1. Check fields
  validate,           // 2. Handle validation errors
  authController.register // 3. Controller logic
);

/**
 * @route POST /api/auth/login
 * @desc Authenticate user & get token
 * @access Public
 */
router.post(
  '/login',
  loginValidation, // 1. Check fields
  validate,        // 2. Handle validation errors
  authController.login // 3. Controller logic
);

module.exports = router;