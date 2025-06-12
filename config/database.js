// Import the Mongoose library to connect to MongoDB
const mongoose = require('mongoose');

// Optionally load environment variables from a .env file
// Uncomment this if you're not loading env vars elsewhere
// require("dotenv").config({ path: "./config/.env" });

// Build the MongoDB connection string using environment variables for security
const MONGO_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.sxqur.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`;

// Async function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to connect using Mongoose
    const conn = await mongoose.connect(MONGO_URI);

    // Log the host name of the connected MongoDB database
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // Log any errors and exit the process with failure
    console.error(err.message);
    process.exit(1);
  }
};

// Export the connectDB function for use in other files
module.exports = connectDB;