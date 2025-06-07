// Load environment variables from config/.env file
require("dotenv").config({ path: "./config/.env" });

// Import core modules and middleware
const express = require('express'); // Main Express framework
const expressLayouts = require('express-ejs-layouts'); //Milldeware to support layout files with EJS
const connectDB = require("./config/database"); // Database connection function
const mongoose = require('mongoose'); // ODM to interact with MongoDB
const methodOverride = require('method-override'); // Middleware to support PUT and DELETE methods in forms
const cors = require('cors'); // Middleware to enable CORS - Cross-Origin Resource Sharing
const logger = require("morgan"); // Logs HTTP requests to the console

// Import route files
const mainRoutes = require("./routes/main");
const flipRoutes = require("./routes/flip");
const rockRoutes = require("./routes/rock");
const itemsRoutes = require("./routes/items");
const numberRoutes = require("./routes/number");

const app = express();

//Connect To MongoDB Database
connectDB();

//Set EJS as tempalting engine for views
app.set('view engine', 'ejs')

// Set EJS layout middleware
app.use(expressLayouts);

//Enable CORS - Cross Origin Resource Sharing
app.use(cors())

//Use Morgan for logging incoming requests to the console
app.use(logger("dev"));

//Serve static folder from public directory
app.use(express.static('public'));

// Method Override for PUT and DELETE requests in forms
app.use(methodOverride('_method'));

//Body parsing - parse results from form data
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/items", itemsRoutes);
app.use("/flip", flipRoutes);
app.use("/rock", rockRoutes);
app.use("/number", numberRoutes)

//Server running
app.listen(process.env.PORT, () => {
    console.log(`Server is running, you better catch it`);
  });