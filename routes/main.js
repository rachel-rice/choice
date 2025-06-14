// Import Express to create a router
const express = require("express");

// Create a new router object
const router = express.Router();

// Import the homeController to handle home page logic
const homeController = require("../controllers/homeController");

//Main Routes 
router.get("/", homeController.getIndex);
router.get("/about", homeController.getAbout);

// Export the router so it can be used in the main app
module.exports = router;