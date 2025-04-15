const express = require("express");
const router = express.Router();
const rockController = require("../controllers/rockController");

// Rock-Paper-Scissors Routes
router.get("/", rockController.getIndex);
router.post("/", rockController.playGame);

module.exports = router;