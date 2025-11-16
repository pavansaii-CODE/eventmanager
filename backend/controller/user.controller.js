const User = require('../models/user.model');

// --- 1. Get Current User Profile (Requires Authentication Middleware) ---
exports.getProfile = async (req, res) => {
  try {
    // req.user.id is populated by the authentication middleware
    const user = await User.findById(req.user.id).select('-password'); // Exclude the password field

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// --- 2. Update Current User Profile ---
exports.updateProfile = async (req, res) => {
  const updates = req.body;
  
  try {
    // Find and update the user by ID, returning the new document
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    // Mongoose validation errors often return a 400 status
    res.status(400).send('Update failed'); 
  }
};