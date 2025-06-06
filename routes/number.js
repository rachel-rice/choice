const express = require("express");
const router = express.Router();
const numberController = require("../controllers/numberController");

// Number Routes
router.get("/", numberController.getIndex);


module.exports = router;