const express = require("express");
const router = express.Router();
const rockController = require("../controllers/rock");


router.get("/", rockController.getIndex);
router.post("/", rockController.playGame);

module.exports = router;