const Vendor = require('../models/vendor.model');
const VendorBooking = require('../models/vendorbooking.model');

// --- 1. Create a new Vendor (Admin or Vendor registration) ---
exports.createVendor = async (req, res) => {
  try {
    const newVendor = new Vendor(req.body);
    const vendor = await newVendor.save();
    res.status(201).json(vendor);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Error creating vendor');
  }
};

// --- 2. Get All Approved Vendors (Public) ---
exports.getAllVendors = async (req, res) => {
  try {
    // Only show vendors that have been approved by an admin
    const vendors = await Vendor.find({ isApproved: true });
    res.json(vendors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// --- 3. Request a Vendor Booking (Client Only) ---
exports.requestVendorBooking = async (req, res) => {
  const { vendorId, serviceDate, serviceLocation, clientNotes } = req.body;
  const clientId = req.user.id; // From auth middleware

  try {
    const vendor = await Vendor.findById(vendorId);
    if (!vendor || !vendor.isApproved) {
      return res.status(404).json({ msg: 'Vendor not found or not approved' });
    }
    
    // Create the initial booking request
    const bookingRequest = new VendorBooking({
      client: clientId,
      vendor: vendorId,
      serviceDate,
      serviceLocation,
      clientNotes,
      status: 'Requested' // Initial status
    });

    await bookingRequest.save();

    // Note: The vendor would typically receive a notification here to review the request

    res.json({ msg: 'Vendor booking request successfully sent.', bookingRequest });
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// --- 4. Update Vendor Booking Status (Vendor/Admin Only) ---
exports.updateBookingStatus = async (req, res) => {
  const { bookingId } = req.params;
  const { status, quotedPrice } = req.body; // Status: Confirmed, Rejected, etc.

  // Note: Add logic here to ensure only the vendor or admin can update this

  try {
    const booking = await VendorBooking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    booking.status = status;
    if (quotedPrice !== undefined) {
        booking.quotedPrice = quotedPrice;
    }

    await booking.save();
    res.json({ msg: `Booking status updated to ${status}`, booking });

  } catch (err) {
    console.error(err.message);
    res.status(400).send('Error updating booking status');
  }
};