const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    //unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['client', 'admin'], // Client for general users, Admin for management
    default: 'client'
  },
  // Other profile details
  phone: String,
  address: String
}, {
  timestamps: true // Adds createdAt and updatedAt
});

module.exports = mongoose.model('User', UserSchema);