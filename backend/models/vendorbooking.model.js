const mongoose = require('mongoose');

const VendorBookingSchema = new mongoose.Schema({
  // Relationship: The user making the request (the client)
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Relationship: The vendor being requested
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  // Booking details
  serviceDate: { // The date the client needs the service
    type: Date,
    required: true
  },
  serviceLocation: {
    type: String,
    required: true
  },
  clientNotes: String, // Special instructions from the client
  // Transaction Status
  status: {
    type: String,
    enum: ['Requested', 'Confirmed', 'Rejected', 'Completed'],
    default: 'Requested'
  },
  // Pricing
  quotedPrice: { // The final price agreed upon by the vendor
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('VendorBooking', VendorBookingSchema);