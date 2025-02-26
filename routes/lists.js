const express = require('express');
const router = express.Router();
const listController = require("../controllers/listController");

// List routes
router.get('/', listController.getAllLists);
router.get('/:id', listController.getListById);
router.post('/add', listController.createList);
router.post('/update/:id', listController.updateList);
router.delete('/delete/:id', listController.deleteList);

module.exports = router;