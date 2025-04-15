const express = require("express");
const router = express.Router();
const flipController = require("../controllers/flipController");


router.get("/", flipController.getIndex);


module.exports = router;