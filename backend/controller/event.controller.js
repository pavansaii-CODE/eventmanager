const Event = require('../models/event.model');
const EventBooking = require('../models/eventbooking.model');

// --- 1. Create a new Event (Admin Only) ---
exports.createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const event = await newEvent.save();
    res.status(201).json(event);
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Error creating event');
  }
};

// --- 2. Get All Events (Public) ---
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ startDate: 1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// --- 3. Register for an Event (Client Only) ---
exports.registerForEvent = async (req, res) => {
  const { eventId, numberOfTickets = 1 } = req.body;
  const userId = req.user.id; // From auth middleware

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    // Check capacity
    if (event.registeredCount + numberOfTickets > event.capacity) {
      return res.status(400).json({ msg: 'Not enough capacity for this many tickets' });
    }

    // Check if user already booked (Optional: depends on business rules)
    const existingBooking = await EventBooking.findOne({ user: userId, event: eventId });
    if (existingBooking) {
        return res.status(400).json({ msg: 'You have already booked this event.' });
    }

    // Create the booking record
    const totalPrice = event.price * numberOfTickets;
    const booking = new EventBooking({
      user: userId,
      event: eventId,
      numberOfTickets,
      totalPrice,
      paymentStatus: 'Completed' // Assuming payment is processed here
    });

    await booking.save();

    // Update event registered count
    event.registeredCount += numberOfTickets;
    await event.save();

    res.json({ msg: 'Registration successful', booking });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Add updateEvent, deleteEvent, getEventById for full CRUD...