const express = require('express');
const router = express.Router();
const itemsController = require("../controllers/itemsController");

// Item routes
router.get('/', itemsController.getAllItems);
router.get('/:id', itemsController.getItemById);
router.post('/add', itemsController.createItem);
router.post('/update/:id', itemsController.updateItem);
router.delete('/delete/:id', itemsController.deleteItem);

module.exports = router;