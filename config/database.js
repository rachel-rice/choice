const mongoose = require('mongoose');
// require("dotenv").config({ path: "./config/.env" });

const MONGO_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.sxqur.mongodb.net/${process.env.MONGODB_DATABASE_NAME}?retryWrites=true&w=majority`;


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;