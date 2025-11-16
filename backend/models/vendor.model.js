const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    unique: true
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['Catering', 'Decorations', 'Photography', 'Venue', 'Entertainment', 'Other'] // Define allowed service types
  },
  description: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  contactPhone: String,
  basePrice: {
    type: Number,
    min: 0,
    default: 0
  },
  // Status to approve/disapprove vendors
  isApproved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Vendor', VendorSchema);