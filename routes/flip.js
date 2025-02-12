const express = require("express");
const router = express.Router();
const flipController = require("../controllers/flip");

//Main Routes 
router.get("/", flipController.getIndex);


module.exports = router;