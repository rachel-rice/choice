const express = require('express');
const router = express.Router();
const listsController = require('../controllers/listsController');

// Show all lists
router.get('/', listsController.getLists);

// Show a single list by ID (with items)
router.get('/:id', listsController.getListById);

// Create a new list
router.post('/add', listsController.createList);

// Update a list by ID
router.post('/update/:id', listsController.updateList);

// Delete a list by ID
router.delete('/delete/:id', listsController.deleteList);

module.exports = router;
