const express = require('express');
const router = express.Router();
const listController = require("../controllers/list");

// Define routes and use the controller functions
router.get('/', listController.getLists);
router.post('/add', listController.addList);
router.post('/update/:id', listController.updateList);
router.delete('/delete/:id', listController.deleteList);

module.exports = router;