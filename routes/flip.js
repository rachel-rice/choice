// Import Express to create a router
const express = require("express");

// Create a new router object
const router = express.Router();

// Import the flipController to handle coin flip logic
const flipController = require("../controllers/flipController");

// Coin Flip Route
router.get("/", flipController.getIndex);

// Export the router to be used in the main app
module.exports = router;