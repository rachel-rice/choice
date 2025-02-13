const express = require("express");
const router = express.Router();
const rockController = require("../controllers/rock");


router.get("/", rockController.getIndex);


module.exports = router;