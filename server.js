const express = require('express');
const connectDB = require("./config/database");
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cors = require('cors');
const logger = require("morgan");
const mainRoutes = require("./routes/main");
const itemRoutes = require("./routes/items");
const flipRoutes = require("./routes/flip");
const rockRoutes = require("./routes/rock");
const listRoutes = require("./routes/lists");

const app = express();

//Connect To MongoDB Database
connectDB();

//Set EJS as tempalting engine for views
app.set('view engine', 'ejs')

//Enable CORS
app.use(cors())

//Use Morgan for logging
app.use(logger("dev"));

//Serve static folder
app.use(express.static('public'));

// Method Override for PUT and DELETE requests
app.use(methodOverride('_method'));

//Body parsing - parse results
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


//Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/items", itemRoutes);
app.use("/lists", listRoutes);
app.use("/flip", flipRoutes);
app.use("/rock", rockRoutes);

//Server running
app.listen(process.env.PORT, () => {
    console.log(`Server is running, you better catch it`);
  });