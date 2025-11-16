// config/db.config.js

const mongoose = require('mongoose');

// Use the environment variable for the database connection string
const DB_URI = process.env.MONGODB_URI; 

const connectDB = async () => {
    if (!DB_URI) {
        console.error("FATAL ERROR: MONGODB_URI is not defined in the .env file.");
        // Exit process if DB URI is not available
        process.exit(1); 
    }

    try {
        await mongoose.connect(DB_URI, {
            // Options to prevent deprecation warnings and ensure stability
            // These are often not strictly necessary in newer Mongoose versions but good practice
            // useNewUrlParser: true, 
            // useUnifiedTopology: true,
            // useCreateIndex: true, // If using mongoose <= 5.x
        });
        console.log("MongoDB successfully connected!");
    } catch (err) {
        console.error("MongoDB connection failed! 🚨");
        console.error(err.message);
        // Exit process with failure
        process.exit(1); 
    }
};

module.exports = connectDB;