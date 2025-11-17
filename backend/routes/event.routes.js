const express = require('express');
const router = express.Router();
const eventController = require('../controller/event.controller');
const { verifyToken, isAdmin, isClient } = require('../middleware/authjwt');
const { eventCreationValidation, validate } = require('../middleware/validator');

// --- Public Access ---

/**
 * @route GET /api/events
 * @desc Get all events
 * @access Public
 */
router.get('/', eventController.getAllEvents);

// --- Admin Access ---

/**
 * @route POST /api/events
 * @desc Create a new event
 * @access Private (Admin Only)
 */
router.post(
  '/',
  verifyToken,        // Must be logged in
  isAdmin,            // Must be an Admin
  eventCreationValidation, // Validation chain
  validate,           // Handle validation errors
  eventController.createEvent
);

// --- Client Access ---

/**
 * @route POST /api/events/:eventId/register
 * @desc Register for an event
 * @access Private (Client Only)
 */
router.post(
  '/:eventId/register',
  verifyToken,  // Must be logged in
  isClient,     // Must be a Client
  eventController.registerForEvent
);

// --- Get Single Event by ID (Public) ---
/**
 * @route GET /api/events/:id
 * @desc Get a single event by ID
 * @access Public
 */
router.get('/:id', eventController.getEventById);


// --- Update/Delete Events (Admin Only) ---
// router.put('/:id', verifyToken, isAdmin, eventController.updateEvent);

module.exports = router;