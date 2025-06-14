// Import Express to create a router
const express = require("express");

// Create a new router object
const router = express.Router();
const numberController = require("../controllers/numberController");

// Number Routes
router.get("/", numberController.getIndex);

// Export the router so it can be used in the main app
module.exports = router;