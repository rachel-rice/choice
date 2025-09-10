require("dotenv").config({ path: "./config/.env" });

// Import core modules and middleware
const express = require('express'); // Main Express framework
const expressLayouts = require('express-ejs-layouts'); //Milldeware to support layout files with EJS
const session = require('express-session'); // Middleware for session management
const passport = require('passport');    // Middleware for authentication
require('./config/passport')(passport); // Register passport strategies before using routes
const connectDB = require("./config/database"); // Database connection function
const mongoose = require('mongoose'); // ODM to interact with MongoDB
const methodOverride = require('method-override'); // Middleware to support PUT and DELETE methods in forms
const cors = require('cors'); // Middleware to enable CORS - Cross-Origin Resource Sharing
const logger = require("morgan"); // Logs HTTP requests to the console

// Import route files
const mainRoutes = require("./routes/main");
const itemsRoutes = require("./routes/items");
const listRoutes = require("./routes/lists");
const flipRoutes = require("./routes/flip");
const rockRoutes = require("./routes/rock");
const numberRoutes = require("./routes/number");
const authRoutes = require("./routes/auth");

const app = express();

connectDB(); //Connect To MongoDB Database

app.set('view engine', 'ejs') //Set EJS as tempalting engine for views

// Middleware

app.use(expressLayouts); // Set EJS layout middleware
app.use(cors()); //Enable CORS - Cross Origin Resource Sharing
app.use(logger("dev")); //Use Morgan for logging incoming requests to the console
app.use(express.static('public')); //Serve static folder from public directory
app.use(methodOverride('_method')); // Method Override for PUT and DELETE requests in forms
app.use(express.urlencoded({ extended: false })); //Body parsing - parse results from form data
app.use(express.json()); //Body parsing - parse JSON data

app.use(session({
  secret: process.env.SESSION_SECRET || 'yoursecret',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use("/", mainRoutes);
app.use("/items", itemsRoutes);
app.use("/lists", listRoutes);
app.use("/flip", flipRoutes);
app.use("/rock", rockRoutes);
app.use("/number", numberRoutes)
app.use("/auth", authRoutes);

//Server
app.listen(process.env.PORT, () => {
    console.log(`Server is running, you better catch it`);
  });