const express = require('express');
const router = express.Router();
const listsController = require('../controllers/listsController');

// Route to view all lists
router.get('/', listsController.getLists);

// Route to create a new list
router.post('/', listsController.createList);

// Route to view one list and its items
router.get('/:id', listsController.getListById);

// Route to pick a random item from a list
router.get('/:id/random', listsController.getRandomItem);

module.exports = router;
