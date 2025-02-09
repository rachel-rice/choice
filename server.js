const express = require('express');
const app = express();
const connectDB = require("./config/database");
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require("morgan");
const mainRoutes = require("./routes/main");
const itemRoutes = require("./routes/item");

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

//Body parsing - parse results
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


//Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/item", itemRoutes);

//Server running
app.listen(process.env.PORT, () => {
    console.log(`Server is running, you better catch it`);
  });