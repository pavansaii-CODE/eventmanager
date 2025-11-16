const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  capacity: { // Maximum number of attendees
    type: Number,
    required: true,
    min: 1
  },
  // Automatically track how many spots are left (optional, can be calculated dynamically)
  registeredCount: {
    type: Number,
    default: 0
  },
  price: { // Ticket price
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);