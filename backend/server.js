// server.js
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

const express = require('express');

const connectDB = require('./db/db.config');

// --- Import Routes ---
const authRoutes = require('./routes/auth.routes');
 const eventRoutes = require('./routes/event.routes'); // Will add these later
 const vendorRoutes = require('./routes/vendor.routes'); // Will add these later
 const userRoutes = require('./routes/user.routes'); // Will add these later


// --- 1. Initialization ---
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// --- 2. Middleware Configuration ---

// Enable CORS (Cross-Origin Resource Sharing)
// Allows frontend (e.g., localhost:3000) to communicate with backend (localhost:5000)
app.use(cors()); 

// Body parser: Express's built-in middleware to parse incoming JSON payloads
app.use(express.json());

// URL-encoded data parser (useful for form submissions)
app.use(express.urlencoded({ extended: true }));


// --- 3. Root Route & API Routing ---

// Simple default route for checking server status
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Welcome to the Event Management Backend API!',
        status: 'Server is running.'
    });
});

// Mount the route files to their respective base paths
app.use('/api/auth', authRoutes);
 app.use('/api/events', eventRoutes); 
 app.use('/api/vendors', vendorRoutes); 
 app.use('/api/users', userRoutes);


// --- 4. Server Start ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    console.log(`Access the API at http://localhost:${PORT}`);
});