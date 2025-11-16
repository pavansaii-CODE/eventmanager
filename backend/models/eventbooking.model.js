const mongoose = require('mongoose');

const EventBookingSchema = new mongoose.Schema({
  // Relationship: The user who booked
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Relationship: The event they booked for
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  // Details of the booking
  numberOfTickets: {
    type: Number,
    min: 1,
    default: 1
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EventBooking', EventBookingSchema);