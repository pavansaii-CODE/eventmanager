const { check, validationResult } = require('express-validator');

// --- General Middleware to Handle Errors ---
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next(); // If no errors, proceed
  }
  // If errors exist, return 400 with the error details
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors
  });
};

// --- Validation Chains ---

// 1. Validation for Registration
exports.registerValidation = [
  check('username', 'Username is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 })
];

// 2. Validation for Login
exports.loginValidation = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

// 3. Validation for Event Creation
exports.eventCreationValidation = [
  check('title', 'Event title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('startDate', 'Valid start date is required').isISO8601().toDate(), // Checks date format
  check('endDate', 'Valid end date is required').isISO8601().toDate(),
  check('capacity', 'Capacity must be a positive number').isInt({ min: 1 })
];