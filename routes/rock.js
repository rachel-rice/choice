// Import Express to create a router
const express = require("express");

// Create a new router object
const router = express.Router();

// Import the rockController to handle Rock-Paper-Scissors logic
const rockController = require("../controllers/rockController");

// Rock-Paper-Scissors Routes
router.get("/", rockController.getIndex);
router.post("/", rockController.playGame);

// Export the router so it can be used in the main app
module.exports = router;