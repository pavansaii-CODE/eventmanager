const express = require('express');
const router = express.Router();
const vendorController = require('../controller/vendor.controller');
const { verifyToken, isAdmin, isClient } = require('../middleware/authjwt');

// --- Public Access ---

/**
 * @route GET /api/vendors
 * @desc Get all approved vendors
 * @access Public
 */
router.get('/', vendorController.getAllVendors);

// --- Admin Access ---

/**
 * @route POST /api/vendors
 * @desc Create a new vendor (Admin or Self-Registration)
 * @access Private (Admin)
 */
router.post(
  '/',
  verifyToken, // Ensures the user is authorized to create this (e.g., admin or vendor user)
  isAdmin,     // Restrict to Admin for simplicity, or add a 'isVendor' role check
  vendorController.createVendor
);

// --- Client Access ---

/**
 * @route POST /api/vendors/book
 * @desc Request a vendor booking
 * @access Private (Client Only)
 */
router.post(
  '/book',
  verifyToken, // Must be logged in
  isClient,    // Must be a Client
  vendorController.requestVendorBooking
);

// --- Admin/Vendor Access ---

/**
 * @route PUT /api/vendors/booking/:bookingId
 * @desc Update the status of a vendor booking request (Confirm/Reject)
 * @access Private (Admin or Vendor)
 */
router.put(
  '/booking/:bookingId',
  verifyToken,
  // Add logic to check if the user is the Admin OR the specific Vendor being booked
  vendorController.updateBookingStatus
);

module.exports = router;