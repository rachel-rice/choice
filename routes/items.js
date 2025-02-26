const express = require("express");
const router = express.Router();
const itemController = require("../controllers/item");

// Define routes and use the controller functions
router.get('/', itemController.getItems);
router.post('/add', itemController.addItem);
router.post('/update/:id', itemController.updateItem);
router.delete('/delete/:id', itemController.deleteItem);

module.exports = router;