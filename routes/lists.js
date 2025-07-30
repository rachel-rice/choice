const express = require('express');
const router = express.Router();
const listsController = require('../controllers/listsController');

// Show all lists
router.get('/', listsController.getLists);

// Show a single list by ID (with items)
router.get('/:id', listsController.getListById);

// Create a new list
router.post('/', listsController.createList);

// Pick a random item from a list
router.get('/:id/random', listsController.getRandomItem);

module.exports = router;
